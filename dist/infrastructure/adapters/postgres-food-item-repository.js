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
exports.PostgresFoodItemRepository = void 0;
const common_1 = require("@nestjs/common");
const food_item_1 = require("../../domain/entities/food-item");
const food_item_id_1 = require("../../domain/value-objects/food-item-id");
const pg_1 = require("pg");
let PostgresFoodItemRepository = class PostgresFoodItemRepository {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "5432"),
            database: process.env.DB_NAME || "food_request_db",
            user: process.env.DB_USER || "food_user",
            password: process.env.DB_PASSWORD || "food_password",
        });
    }
    async save(foodItem) {
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
            foodItem.getCategory(),
        ];
        await this.pool.query(query, values);
    }
    async findById(id) {
        const query = "SELECT * FROM food_items WHERE id = $1";
        const result = await this.pool.query(query, [id.getValue()]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new food_item_1.FoodItem(new food_item_id_1.FoodItemId(row.id), row.name, row.description, row.price, row.category);
    }
    async findByCategory(category) {
        const query = "SELECT * FROM food_items WHERE category = $1 ORDER BY name";
        const result = await this.pool.query(query, [category]);
        return result.rows.map((row) => new food_item_1.FoodItem(new food_item_id_1.FoodItemId(row.id), row.name, row.description, row.price, row.category));
    }
    async findAll() {
        const query = "SELECT * FROM food_items ORDER BY name";
        const result = await this.pool.query(query);
        return result.rows.map((row) => new food_item_1.FoodItem(new food_item_id_1.FoodItemId(row.id), row.name, row.description, row.price, row.category));
    }
    async delete(id) {
        const query = "DELETE FROM food_items WHERE id = $1";
        await this.pool.query(query, [id.getValue()]);
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
exports.PostgresFoodItemRepository = PostgresFoodItemRepository;
exports.PostgresFoodItemRepository = PostgresFoodItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PostgresFoodItemRepository);
//# sourceMappingURL=postgres-food-item-repository.js.map