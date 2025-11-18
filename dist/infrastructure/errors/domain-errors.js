"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.ValidationError = exports.InvalidFoodItemError = exports.InvalidFoodRequestStatusError = exports.FoodRequestNotFoundError = void 0;
const common_1 = require("@nestjs/common");
class FoodRequestNotFoundError extends Error {
    constructor(id) {
        super(`Food request with ID ${id} not found`);
        this.name = "FoodRequestNotFoundError";
    }
}
exports.FoodRequestNotFoundError = FoodRequestNotFoundError;
class InvalidFoodRequestStatusError extends Error {
    constructor(currentStatus, attemptedAction) {
        super(`Cannot ${attemptedAction} food request with status ${currentStatus}`);
        this.name = "InvalidFoodRequestStatusError";
    }
}
exports.InvalidFoodRequestStatusError = InvalidFoodRequestStatusError;
class InvalidFoodItemError extends Error {
    constructor(foodItemId) {
        super(`Food item with ID ${foodItemId} is invalid or not found`);
        this.name = "InvalidFoodItemError";
    }
}
exports.InvalidFoodItemError = InvalidFoodItemError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
let ErrorHandler = class ErrorHandler {
    static handleDomainError(error) {
        switch (error.name) {
            case "FoodRequestNotFoundError":
                return new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            case "InvalidFoodRequestStatusError":
                return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            case "InvalidFoodItemError":
                return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            case "ValidationError":
                return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            default:
                return new common_1.HttpException("Internal server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ErrorHandler = ErrorHandler;
exports.ErrorHandler = ErrorHandler = __decorate([
    (0, common_1.Injectable)()
], ErrorHandler);
//# sourceMappingURL=domain-errors.js.map