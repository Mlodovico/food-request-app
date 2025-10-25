"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRequest = void 0;
const food_request_status_1 = require("../value-objects/food-request-status");
class FoodRequest {
    constructor(id, customerId, items, status, createdAt, updatedAt, totalAmount, notes) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalAmount = totalAmount;
        this.notes = notes;
        if (!customerId || customerId.trim().length === 0) {
            throw new Error('Customer ID cannot be empty');
        }
        if (!items || items.length === 0) {
            throw new Error('Food request must have at least one item');
        }
        if (totalAmount < 0) {
            throw new Error('Total amount cannot be negative');
        }
    }
    getId() {
        return this.id;
    }
    getCustomerId() {
        return this.customerId;
    }
    getItems() {
        return [...this.items];
    }
    getStatus() {
        return this.status;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getTotalAmount() {
        return this.totalAmount;
    }
    getNotes() {
        return this.notes;
    }
    approve() {
        if (this.status !== food_request_status_1.FoodRequestStatus.PENDING) {
            throw new Error('Only pending requests can be approved');
        }
        this.status = food_request_status_1.FoodRequestStatus.APPROVED;
        this.updatedAt = new Date();
    }
    reject() {
        if (this.status !== food_request_status_1.FoodRequestStatus.PENDING) {
            throw new Error('Only pending requests can be rejected');
        }
        this.status = food_request_status_1.FoodRequestStatus.REJECTED;
        this.updatedAt = new Date();
    }
    fulfill() {
        if (this.status !== food_request_status_1.FoodRequestStatus.APPROVED) {
            throw new Error('Only approved requests can be fulfilled');
        }
        this.status = food_request_status_1.FoodRequestStatus.FULFILLED;
        this.updatedAt = new Date();
    }
    cancel() {
        if (this.status === food_request_status_1.FoodRequestStatus.FULFILLED) {
            throw new Error('Fulfilled requests cannot be cancelled');
        }
        this.status = food_request_status_1.FoodRequestStatus.CANCELLED;
        this.updatedAt = new Date();
    }
    updateNotes(notes) {
        this.notes = notes;
        this.updatedAt = new Date();
    }
    equals(other) {
        return this.id.equals(other.id);
    }
}
exports.FoodRequest = FoodRequest;
//# sourceMappingURL=food-request.js.map