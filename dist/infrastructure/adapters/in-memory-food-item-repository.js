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
exports.InMemoryFoodItemRepository = void 0;
const common_1 = require("@nestjs/common");
const food_item_1 = require("../../domain/entities/food-item");
const food_item_id_1 = require("../../domain/value-objects/food-item-id");
let InMemoryFoodItemRepository = class InMemoryFoodItemRepository {
    constructor() {
        this.foodItems = new Map();
        this.initializeSampleData();
    }
    async save(foodItem) {
        this.foodItems.set(foodItem.getId().getValue(), foodItem);
    }
    async findById(id) {
        return this.foodItems.get(id.getValue()) || null;
    }
    async findByCategory(category) {
        return Array.from(this.foodItems.values()).filter((item) => item.getCategory() === category);
    }
    async findAll() {
        return Array.from(this.foodItems.values());
    }
    async delete(id) {
        this.foodItems.delete(id.getValue());
    }
    initializeSampleData() {
        const sampleItems = [
            {
                id: "ITEM-001",
                name: "Margherita Pizza",
                description: "Classic pizza with tomato sauce, mozzarella, and basil",
                price: 12.99,
                category: "Pizza",
            },
            {
                id: "ITEM-002",
                name: "Pepperoni Pizza",
                description: "Pizza topped with pepperoni and mozzarella cheese",
                price: 14.99,
                category: "Pizza",
            },
            {
                id: "ITEM-003",
                name: "Caesar Salad",
                description: "Fresh romaine lettuce with caesar dressing and croutons",
                price: 8.99,
                category: "Salad",
            },
            {
                id: "ITEM-004",
                name: "Chicken Burger",
                description: "Grilled chicken breast with lettuce, tomato, and mayo",
                price: 11.99,
                category: "Burger",
            },
            {
                id: "ITEM-005",
                name: "Chocolate Cake",
                description: "Rich chocolate cake with chocolate frosting",
                price: 6.99,
                category: "Dessert",
            },
        ];
        sampleItems.forEach((item) => {
            const foodItem = new food_item_1.FoodItem(new food_item_id_1.FoodItemId(item.id), item.name, item.description, item.price, item.category);
            this.foodItems.set(item.id, foodItem);
        });
    }
};
exports.InMemoryFoodItemRepository = InMemoryFoodItemRepository;
exports.InMemoryFoodItemRepository = InMemoryFoodItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryFoodItemRepository);
//# sourceMappingURL=in-memory-food-item-repository.js.map