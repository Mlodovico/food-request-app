import { Injectable } from "@nestjs/common";
import { FoodRequest } from "@domain/entities/food-request";
import { RequestId } from "@domain/value-objects/request-id";
import { FoodRequestStatus } from "@domain/value-objects/food-request-status";
import { FoodRequestRepository } from "@domain/repositories/food-request-repository";
import { Pool } from "pg";
import { FoodRequestItem } from "@domain/entities/food-request-item";
import { FoodItemId } from "@domain/value-objects/food-item-id";
import { Quantity } from "@domain/value-objects/quantity";

@Injectable()
export class PostgresFoodRequestRepository implements FoodRequestRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME || "food_request_db",
      user: process.env.DB_USER || "food_user",
      password: process.env.DB_PASSWORD || "food_password",
    });
  }

  async save(foodRequest: FoodRequest): Promise<void> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      // Insert or update food request
      const requestQuery = `
        INSERT INTO food_requests (id, customer_id, status, total_amount, updated_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        ON CONFLICT (id) 
        DO UPDATE SET 
          customer_id = EXCLUDED.customer_id,
          status = EXCLUDED.status,
          total_amount = EXCLUDED.total_amount,
          updated_at = CURRENT_TIMESTAMP
      `;

      await client.query(requestQuery, [
        foodRequest.getId().getValue(),
        foodRequest.getCustomerId(),
        foodRequest.getStatus(),
        foodRequest.getTotalAmount(),
      ]);

      // Delete existing items
      await client.query(
        "DELETE FROM food_request_items WHERE food_request_id = $1",
        [foodRequest.getId().getValue()],
      );

      // Insert new items
      const items = foodRequest.getItems();
      for (const item of items) {
        const itemQuery = `
          INSERT INTO food_request_items (food_request_id, food_item_id, quantity, unit_price)
          VALUES ($1, $2, $3, $4)
        `;

        await client.query(itemQuery, [
          foodRequest.getId().getValue(),
          item.getFoodItemId().getValue(),
          item.getQuantity().getValue(),
        ]);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: RequestId): Promise<FoodRequest | null> {
    const query = `
      SELECT 
        fr.*,
        fri.food_item_id,
        fri.quantity,
        fri.unit_price,
        fi.name as food_item_name,
        fi.description as food_item_description,
        fi.category as food_item_category
      FROM food_requests fr
      LEFT JOIN food_request_items fri ON fr.id = fri.food_request_id
      LEFT JOIN food_items fi ON fri.food_item_id = fi.id
      WHERE fr.id = $1
    `;

    const result = await this.pool.query(query, [id.getValue()]);

    if (result.rows.length === 0) {
      return null;
    }

    // Group rows by request and build items
    const requestData = result.rows[0];
    const items = result.rows
      .filter((row) => row.food_item_id)
      .map(
        (row) =>
          new FoodRequestItem(
            new FoodItemId(row.food_item_id),
            new Quantity(row.quantity),
            row.special_instructions,
          ),
      );

    // Create FoodRequest entity (you'll need to adapt this based on your entity constructor)
    return new FoodRequest(
      new RequestId(requestData.id),
      requestData.customer_id,
      items,
      requestData.status,
      requestData.created_at,
      requestData.updated_at,
      requestData.total_amount,
      requestData.notes,
    );
  }

  async findByCustomerId(customerId: string): Promise<FoodRequest[]> {
    const query =
      "SELECT id FROM food_requests WHERE customer_id = $1 ORDER BY created_at DESC";
    const result = await this.pool.query(query, [customerId]);

    const requests: FoodRequest[] = [];
    for (const row of result.rows) {
      const request = await this.findById(new RequestId(row.id));
      if (request) {
        requests.push(request);
      }
    }

    return requests;
  }

  async findByStatus(status: FoodRequestStatus): Promise<FoodRequest[]> {
    const query =
      "SELECT id FROM food_requests WHERE status = $1 ORDER BY created_at DESC";
    const result = await this.pool.query(query, [status]);

    const requests: FoodRequest[] = [];
    for (const row of result.rows) {
      const request = await this.findById(new RequestId(row.id));
      if (request) {
        requests.push(request);
      }
    }

    return requests;
  }

  async findAll(): Promise<FoodRequest[]> {
    const query = "SELECT id FROM food_requests ORDER BY created_at DESC";
    const result = await this.pool.query(query);

    const requests: FoodRequest[] = [];
    for (const row of result.rows) {
      const request = await this.findById(new RequestId(row.id));
      if (request) {
        requests.push(request);
      }
    }

    return requests;
  }

  async delete(id: RequestId): Promise<void> {
    const query = "DELETE FROM food_requests WHERE id = $1";
    await this.pool.query(query, [id.getValue()]);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
