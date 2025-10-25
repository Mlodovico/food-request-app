"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItem = void 0;
class FoodItem {
    constructor(id, name, description, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        if (!name || name.trim().length === 0) {
            throw new Error('Food item name cannot be empty');
        }
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        if (!category || category.trim().length === 0) {
            throw new Error('Category cannot be empty');
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getPrice() {
        return this.price;
    }
    getCategory() {
        return this.category;
    }
    equals(other) {
        return this.id.equals(other.id);
    }
}
exports.FoodItem = FoodItem;
//# sourceMappingURL=food-item.js.map