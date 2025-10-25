"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemId = void 0;
class FoodItemId {
    constructor(value) {
        this.value = value;
        if (!value || value.trim().length === 0) {
            throw new Error('FoodItemId cannot be empty');
        }
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
exports.FoodItemId = FoodItemId;
//# sourceMappingURL=food-item-id.js.map