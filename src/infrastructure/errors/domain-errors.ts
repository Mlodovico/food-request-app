import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

export class FoodRequestNotFoundError extends Error {
  constructor(id: string) {
    super(`Food request with ID ${id} not found`);
    this.name = 'FoodRequestNotFoundError';
  }
}

export class InvalidFoodRequestStatusError extends Error {
  constructor(currentStatus: string, attemptedAction: string) {
    super(`Cannot ${attemptedAction} food request with status ${currentStatus}`);
    this.name = 'InvalidFoodRequestStatusError';
  }
}

export class InvalidFoodItemError extends Error {
  constructor(foodItemId: string) {
    super(`Food item with ID ${foodItemId} is invalid or not found`);
    this.name = 'InvalidFoodItemError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

@Injectable()
export class ErrorHandler {
  static handleDomainError(error: Error): HttpException {
    switch (error.name) {
      case 'FoodRequestNotFoundError':
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      case 'InvalidFoodRequestStatusError':
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      case 'InvalidFoodItemError':
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      case 'ValidationError':
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      default:
        return new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
