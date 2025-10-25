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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemService = void 0;
const common_1 = require("@nestjs/common");
const food_item_id_1 = require("../../domain/value-objects/food-item-id");
let FoodItemService = class FoodItemService {
    constructor(foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }
    async validateFoodItems(items) {
        for (const item of items) {
            const foodItemId = new food_item_id_1.FoodItemId(item.foodItemId);
            const foodItem = await this.foodItemRepository.findById(foodItemId);
            if (!foodItem) {
                return false;
            }
        }
        return true;
    }
    async calculateTotalAmount(items) {
        let totalAmount = 0;
        for (const item of items) {
            const foodItemId = new food_item_id_1.FoodItemId(item.foodItemId);
            const foodItem = await this.foodItemRepository.findById(foodItemId);
            if (foodItem) {
                totalAmount += foodItem.getPrice() * item.quantity;
            }
        }
        return totalAmount;
    }
};
exports.FoodItemService = FoodItemService;
exports.FoodItemService = FoodItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FoodItemRepository')),
    __metadata("design:paramtypes", [Object])
], FoodItemService);
//# sourceMappingURL=food-item.service.js.map