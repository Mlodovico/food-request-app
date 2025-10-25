"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRequestItem = void 0;
class FoodRequestItem {
    constructor(foodItemId, quantity, specialInstructions) {
        this.foodItemId = foodItemId;
        this.quantity = quantity;
        this.specialInstructions = specialInstructions;
    }
    getFoodItemId() {
        return this.foodItemId;
    }
    getQuantity() {
        return this.quantity;
    }
    getSpecialInstructions() {
        return this.specialInstructions;
    }
    equals(other) {
        return this.foodItemId.equals(other.foodItemId);
    }
}
exports.FoodRequestItem = FoodRequestItem;
//# sourceMappingURL=food-request-item.js.map