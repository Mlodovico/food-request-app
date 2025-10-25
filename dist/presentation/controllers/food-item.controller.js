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
exports.FoodItemController = exports.FoodItemResponseDto = void 0;
const common_1 = require("@nestjs/common");
const food_item_id_1 = require("../../domain/value-objects/food-item-id");
class FoodItemResponseDto {
    constructor(id, name, description, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}
exports.FoodItemResponseDto = FoodItemResponseDto;
let FoodItemController = class FoodItemController {
    constructor(foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }
    async getAllFoodItems() {
        const foodItems = await this.foodItemRepository.findAll();
        return foodItems.map(item => new FoodItemResponseDto(item.getId().getValue(), item.getName(), item.getDescription(), item.getPrice(), item.getCategory()));
    }
    async getFoodItemById(id) {
        const foodItemId = new food_item_id_1.FoodItemId(id);
        const foodItem = await this.foodItemRepository.findById(foodItemId);
        if (!foodItem) {
            throw new Error('Food item not found');
        }
        return new FoodItemResponseDto(foodItem.getId().getValue(), foodItem.getName(), foodItem.getDescription(), foodItem.getPrice(), foodItem.getCategory());
    }
    async getFoodItemsByCategory(category) {
        const foodItems = await this.foodItemRepository.findByCategory(category);
        return foodItems.map(item => new FoodItemResponseDto(item.getId().getValue(), item.getName(), item.getDescription(), item.getPrice(), item.getCategory()));
    }
};
exports.FoodItemController = FoodItemController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodItemController.prototype, "getAllFoodItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodItemController.prototype, "getFoodItemById", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodItemController.prototype, "getFoodItemsByCategory", null);
exports.FoodItemController = FoodItemController = __decorate([
    (0, common_1.Controller)('food-items'),
    __param(0, (0, common_1.Inject)('FoodItemRepository')),
    __metadata("design:paramtypes", [Object])
], FoodItemController);
//# sourceMappingURL=food-item.controller.js.map