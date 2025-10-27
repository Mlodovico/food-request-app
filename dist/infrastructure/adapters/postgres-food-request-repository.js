"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresFoodRequestRepository = void 0;
const common_1 = require("@nestjs/common");
const food_request_1 = require("../../domain/entities/food-request");
const request_id_1 = require("../../domain/value-objects/request-id");
const pg_1 = require("pg");
const food_request_item_1 = require("../../domain/entities/food-request-item");
const food_item_id_1 = require("../../domain/value-objects/food-item-id");
const quantity_1 = require("../../domain/value-objects/quantity");
let PostgresFoodRequestRepository = class PostgresFoodRequestRepository {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "5432"),
            database: process.env.DB_NAME || "food_request_db",
            user: process.env.DB_USER || "food_user",
            password: process.env.DB_PASSWORD || "food_password",
        });
    }
    async save(foodRequest) {
        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
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
            await client.query("DELETE FROM food_request_items WHERE food_request_id = $1", [foodRequest.getId().getValue()]);
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
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    }
    async findById(id) {
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
        const requestData = result.rows[0];
        const items = result.rows
            .filter((row) => row.food_item_id)
            .map((row) => new food_request_item_1.FoodRequestItem(new food_item_id_1.FoodItemId(row.food_item_id), new quantity_1.Quantity(row.quantity), row.special_instructions));
        return new food_request_1.FoodRequest(new request_id_1.RequestId(requestData.id), requestData.customer_id, items, requestData.status, requestData.created_at, requestData.updated_at, requestData.total_amount, requestData.notes);
    }
    async findByCustomerId(customerId) {
        const query = "SELECT id FROM food_requests WHERE customer_id = $1 ORDER BY created_at DESC";
        const result = await this.pool.query(query, [customerId]);
        const requests = [];
        for (const row of result.rows) {
            const request = await this.findById(new request_id_1.RequestId(row.id));
            if (request) {
                requests.push(request);
            }
        }
        return requests;
    }
    async findByStatus(status) {
        const query = "SELECT id FROM food_requests WHERE status = $1 ORDER BY created_at DESC";
        const result = await this.pool.query(query, [status]);
        const requests = [];
        for (const row of result.rows) {
            const request = await this.findById(new request_id_1.RequestId(row.id));
            if (request) {
                requests.push(request);
            }
        }
        return requests;
    }
    async findAll() {
        const query = "SELECT id FROM food_requests ORDER BY created_at DESC";
        const result = await this.pool.query(query);
        const requests = [];
        for (const row of result.rows) {
            const request = await this.findById(new request_id_1.RequestId(row.id));
            if (request) {
                requests.push(request);
            }
        }
        return requests;
    }
    async delete(id) {
        const query = "DELETE FROM food_requests WHERE id = $1";
        await this.pool.query(query, [id.getValue()]);
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
exports.PostgresFoodRequestRepository = PostgresFoodRequestRepository;
exports.PostgresFoodRequestRepository = PostgresFoodRequestRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PostgresFoodRequestRepository);
//# sourceMappingURL=postgres-food-request-repository.js.map