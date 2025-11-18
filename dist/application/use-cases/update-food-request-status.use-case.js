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
exports.UpdateFoodRequestStatusUseCase = void 0;
const common_1 = require("@nestjs/common");
const request_id_1 = require("../../domain/value-objects/request-id");
let UpdateFoodRequestStatusUseCase = class UpdateFoodRequestStatusUseCase {
    constructor(foodRequestRepository) {
        this.foodRequestRepository = foodRequestRepository;
    }
    async approveFoodRequest(id) {
        const requestId = new request_id_1.RequestId(id);
        const foodRequest = await this.foodRequestRepository.findById(requestId);
        if (!foodRequest) {
            throw new Error("Food request not found");
        }
        foodRequest.approve();
        await this.foodRequestRepository.save(foodRequest);
    }
    async rejectFoodRequest(id) {
        const requestId = new request_id_1.RequestId(id);
        const foodRequest = await this.foodRequestRepository.findById(requestId);
        if (!foodRequest) {
            throw new Error("Food request not found");
        }
        foodRequest.reject();
        await this.foodRequestRepository.save(foodRequest);
    }
    async fulfillFoodRequest(id) {
        const requestId = new request_id_1.RequestId(id);
        const foodRequest = await this.foodRequestRepository.findById(requestId);
        if (!foodRequest) {
            throw new Error("Food request not found");
        }
        foodRequest.fulfill();
        await this.foodRequestRepository.save(foodRequest);
    }
    async cancelFoodRequest(id) {
        const requestId = new request_id_1.RequestId(id);
        const foodRequest = await this.foodRequestRepository.findById(requestId);
        if (!foodRequest) {
            throw new Error("Food request not found");
        }
        foodRequest.cancel();
        await this.foodRequestRepository.save(foodRequest);
    }
};
exports.UpdateFoodRequestStatusUseCase = UpdateFoodRequestStatusUseCase;
exports.UpdateFoodRequestStatusUseCase = UpdateFoodRequestStatusUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("FoodRequestRepository")),
    __metadata("design:paramtypes", [Object])
], UpdateFoodRequestStatusUseCase);
//# sourceMappingURL=update-food-request-status.use-case.js.map