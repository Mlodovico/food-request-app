"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quantity = void 0;
class Quantity {
    constructor(value) {
        this.value = value;
        if (value <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        if (!Number.isInteger(value)) {
            throw new Error('Quantity must be an integer');
        }
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value.toString();
    }
}
exports.Quantity = Quantity;
//# sourceMappingURL=quantity.js.map