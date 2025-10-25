import { HttpException } from '@nestjs/common';
export declare class FoodRequestNotFoundError extends Error {
    constructor(id: string);
}
export declare class InvalidFoodRequestStatusError extends Error {
    constructor(currentStatus: string, attemptedAction: string);
}
export declare class InvalidFoodItemError extends Error {
    constructor(foodItemId: string);
}
export declare class ValidationError extends Error {
    constructor(message: string);
}
export declare class ErrorHandler {
    static handleDomainError(error: Error): HttpException;
}
