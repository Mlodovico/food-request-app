"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRequestResponseDto = exports.FoodRequestItemResponseDto = void 0;
class FoodRequestItemResponseDto {
    constructor(foodItemId, quantity, specialInstructions) {
        this.foodItemId = foodItemId;
        this.quantity = quantity;
        this.specialInstructions = specialInstructions;
    }
}
exports.FoodRequestItemResponseDto = FoodRequestItemResponseDto;
class FoodRequestResponseDto {
    constructor(id, customerId, items, status, createdAt, updatedAt, totalAmount, notes) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalAmount = totalAmount;
        this.notes = notes;
    }
}
exports.FoodRequestResponseDto = FoodRequestResponseDto;
//# sourceMappingURL=food-request-response.dto.js.map