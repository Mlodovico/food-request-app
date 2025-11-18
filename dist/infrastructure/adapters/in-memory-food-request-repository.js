"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryFoodRequestRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryFoodRequestRepository = class InMemoryFoodRequestRepository {
    constructor() {
        this.foodRequests = new Map();
    }
    async save(foodRequest) {
        this.foodRequests.set(foodRequest.getId().getValue(), foodRequest);
    }
    async findById(id) {
        return this.foodRequests.get(id.getValue()) || null;
    }
    async findByCustomerId(customerId) {
        return Array.from(this.foodRequests.values()).filter((request) => request.getCustomerId() === customerId);
    }
    async findByStatus(status) {
        return Array.from(this.foodRequests.values()).filter((request) => request.getStatus() === status);
    }
    async findAll() {
        return Array.from(this.foodRequests.values());
    }
    async delete(id) {
        this.foodRequests.delete(id.getValue());
    }
};
exports.InMemoryFoodRequestRepository = InMemoryFoodRequestRepository;
exports.InMemoryFoodRequestRepository = InMemoryFoodRequestRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryFoodRequestRepository);
//# sourceMappingURL=in-memory-food-request-repository.js.map