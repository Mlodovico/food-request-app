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
exports.CreateFoodRequestUseCase = void 0;
const common_1 = require("@nestjs/common");
const food_request_1 = require("../../domain/entities/food-request");
const food_request_item_1 = require("../../domain/entities/food-request-item");
const request_id_1 = require("../../domain/value-objects/request-id");
const food_item_id_1 = require("../../domain/value-objects/food-item-id");
const quantity_1 = require("../../domain/value-objects/quantity");
const food_request_status_1 = require("../../domain/value-objects/food-request-status");
const food_item_service_1 = require("./food-item.service");
let CreateFoodRequestUseCase = class CreateFoodRequestUseCase {
    constructor(foodRequestRepository, foodItemService) {
        this.foodRequestRepository = foodRequestRepository;
        this.foodItemService = foodItemService;
    }
    async createFoodRequest(customerId, items, notes) {
        const isValid = await this.foodItemService.validateFoodItems(items);
        if (!isValid) {
            throw new Error("One or more food items are invalid");
        }
        const totalAmount = await this.foodItemService.calculateTotalAmount(items);
        const foodRequestItems = items.map((item) => new food_request_item_1.FoodRequestItem(new food_item_id_1.FoodItemId(item.foodItemId), new quantity_1.Quantity(item.quantity), item.specialInstructions));
        const requestId = new request_id_1.RequestId(this.generateRequestId());
        const foodRequest = new food_request_1.FoodRequest(requestId, customerId, foodRequestItems, food_request_status_1.FoodRequestStatus.PENDING, new Date(), new Date(), totalAmount, notes);
        await this.foodRequestRepository.save(foodRequest);
        return foodRequest;
    }
    generateRequestId() {
        return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
};
exports.CreateFoodRequestUseCase = CreateFoodRequestUseCase;
exports.CreateFoodRequestUseCase = CreateFoodRequestUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("FoodRequestRepository")),
    __metadata("design:paramtypes", [Object, food_item_service_1.FoodItemService])
], CreateFoodRequestUseCase);
//# sourceMappingURL=create-food-request.use-case.js.map