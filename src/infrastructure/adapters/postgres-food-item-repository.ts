import { Injectable } from '@nestjs/common';
import { FoodItem } from '@domain/entities/food-item';
import { FoodItemId } from '@domain/value-objects/food-item-id';
import { FoodItemRepository } from '@domain/repositories/food-item-repository';
// @ts-ignore
import { Pool } from 'pg';

@Injectable()
export class PostgresFoodItemRepository implements FoodItemRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'food_request_db',
      user: process.env.DB_USER || 'food_user',
      password: process.env.DB_PASSWORD || 'food_password',
    });
  }

  async save(foodItem: FoodItem): Promise<void> {
    const query = `
      INSERT INTO food_items (id, name, description, price, category, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      ON CONFLICT (id) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        category = EXCLUDED.category,
        updated_at = CURRENT_TIMESTAMP
    `;
    
    const values = [
      foodItem.getId().getValue(),
      foodItem.getName(),
      foodItem.getDescription(),
      foodItem.getPrice(),
      foodItem.getCategory()
    ];

    await this.pool.query(query, values);
  }

  async findById(id: FoodItemId): Promise<FoodItem | null> {
    const query = 'SELECT * FROM food_items WHERE id = $1';
    const result = await this.pool.query(query, [id.getValue()]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new FoodItem(
      new FoodItemId(row.id),
      row.name,
      row.description,
      row.price,
      row.category
    );
  }

  async findByCategory(category: string): Promise<FoodItem[]> {
    const query = 'SELECT * FROM food_items WHERE category = $1 ORDER BY name';
    const result = await this.pool.query(query, [category]);
    
    return result.rows.map(row => new FoodItem(
      new FoodItemId(row.id),
      row.name,
      row.description,
      row.price,
      row.category
    ));
  }

  async findAll(): Promise<FoodItem[]> {
    const query = 'SELECT * FROM food_items ORDER BY name';
    const result = await this.pool.query(query);
    
    return result.rows.map(row => new FoodItem(
      new FoodItemId(row.id),
      row.name,
      row.description,
      row.price,
      row.category
    ));
  }

  async delete(id: FoodItemId): Promise<void> {
    const query = 'DELETE FROM food_items WHERE id = $1';
    await this.pool.query(query, [id.getValue()]);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
