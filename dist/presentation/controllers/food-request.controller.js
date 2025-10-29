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
exports.FoodRequestController = void 0;
const common_1 = require("@nestjs/common");
const create_food_request_dto_1 = require("../dto/create-food-request.dto");
const food_request_response_dto_1 = require("../dto/food-request-response.dto");
const create_food_request_use_case_1 = require("../../application/use-cases/create-food-request.use-case");
const get_food_request_use_case_1 = require("../../application/use-cases/get-food-request.use-case");
const update_food_request_status_use_case_1 = require("../../application/use-cases/update-food-request-status.use-case");
const throttler_1 = require("@nestjs/throttler");
const circuit_breaker_interceptor_1 = require("../../infrastructure/decorator/circuit-breaker.interceptor");
let FoodRequestController = class FoodRequestController {
    constructor(createFoodRequestUseCase, getFoodRequestUseCase, updateFoodRequestStatusUseCase) {
        this.createFoodRequestUseCase = createFoodRequestUseCase;
        this.getFoodRequestUseCase = getFoodRequestUseCase;
        this.updateFoodRequestStatusUseCase = updateFoodRequestStatusUseCase;
    }
    async createFoodRequest(createFoodRequestDto) {
        try {
            const foodRequest = await this.createFoodRequestUseCase.createFoodRequest(createFoodRequestDto.customerId, createFoodRequestDto.items, createFoodRequestDto.notes);
            return this.mapToResponseDto(foodRequest);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getFoodRequestById(id) {
        const foodRequest = await this.getFoodRequestUseCase.getFoodRequestById(id);
        if (!foodRequest) {
            throw new common_1.NotFoundException("Food request not found");
        }
        return this.mapToResponseDto(foodRequest);
    }
    async getFoodRequestsByCustomerId(customerId) {
        const foodRequests = await this.getFoodRequestUseCase.getFoodRequestsByCustomerId(customerId);
        return foodRequests.map((request) => this.mapToResponseDto(request));
    }
    async approveFoodRequest(id) {
        try {
            await this.updateFoodRequestStatusUseCase.approveFoodRequest(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async rejectFoodRequest(id) {
        try {
            await this.updateFoodRequestStatusUseCase.rejectFoodRequest(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async fulfillFoodRequest(id) {
        try {
            await this.updateFoodRequestStatusUseCase.fulfillFoodRequest(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async cancelFoodRequest(id) {
        try {
            await this.updateFoodRequestStatusUseCase.cancelFoodRequest(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    mapToResponseDto(foodRequest) {
        const items = foodRequest
            .getItems()
            .map((item) => new food_request_response_dto_1.FoodRequestItemResponseDto(item.getFoodItemId().getValue(), item.getQuantity().getValue(), item.getSpecialInstructions()));
        return new food_request_response_dto_1.FoodRequestResponseDto(foodRequest.getId().getValue(), foodRequest.getCustomerId(), items, foodRequest.getStatus(), foodRequest.getCreatedAt(), foodRequest.getUpdatedAt(), foodRequest.getTotalAmount(), foodRequest.getNotes());
    }
};
exports.FoodRequestController = FoodRequestController;
__decorate([
    (0, common_1.Post)("order"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("write"),
    (0, throttler_1.Throttle)({ short: { limit: 5, ttl: 1000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_food_request_dto_1.CreateFoodRequestDto]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "createFoodRequest", null);
__decorate([
    (0, common_1.Get)("get-order/:id"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("read"),
    (0, throttler_1.Throttle)({ long: { limit: 60, ttl: 1000 } }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "getFoodRequestById", null);
__decorate([
    (0, common_1.Get)("customer/:customerId"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("read"),
    (0, throttler_1.Throttle)({ medium: { limit: 20, ttl: 1000 } }),
    __param(0, (0, common_1.Param)("customerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "getFoodRequestsByCustomerId", null);
__decorate([
    (0, common_1.Put)(":id/approve"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("update"),
    (0, throttler_1.Throttle)({ short: { limit: 3, ttl: 1000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "approveFoodRequest", null);
__decorate([
    (0, common_1.Put)(":id/reject"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("delete"),
    (0, throttler_1.Throttle)({ short: { limit: 3, ttl: 1000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "rejectFoodRequest", null);
__decorate([
    (0, common_1.Put)(":id/fulfill"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("update"),
    (0, throttler_1.Throttle)({ short: { limit: 5, ttl: 1000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "fulfillFoodRequest", null);
__decorate([
    (0, common_1.Put)(":id/cancel"),
    (0, circuit_breaker_interceptor_1.CircuitBreaker)("delete"),
    (0, throttler_1.Throttle)({ short: { limit: 6, ttl: 1000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodRequestController.prototype, "cancelFoodRequest", null);
exports.FoodRequestController = FoodRequestController = __decorate([
    (0, common_1.Controller)("food-requests"),
    __metadata("design:paramtypes", [create_food_request_use_case_1.CreateFoodRequestUseCase,
        get_food_request_use_case_1.GetFoodRequestUseCase,
        update_food_request_status_use_case_1.UpdateFoodRequestStatusUseCase])
], FoodRequestController);
//# sourceMappingURL=food-request.controller.js.map