import { FoodRequest } from "@domain/entities/food-request";
import { FoodRequestItem } from "@domain/entities/food-request-item";
import { RequestId } from "@domain/value-objects/request-id";
import { FoodItemId } from "@domain/value-objects/food-item-id";
import { Quantity } from "@domain/value-objects/quantity";

export interface CreateFoodRequestPort {
  createFoodRequest(
    customerId: string,
    items: Array<{
      foodItemId: string;
      quantity: number;
      specialInstructions?: string;
    }>,
    notes?: string,
  ): Promise<FoodRequest>;
}

export interface GetFoodRequestPort {
  getFoodRequestById(id: string): Promise<FoodRequest | null>;
  getFoodRequestsByCustomerId(customerId: string): Promise<FoodRequest[]>;
}

export interface UpdateFoodRequestStatusPort {
  approveFoodRequest(id: string): Promise<void>;
  rejectFoodRequest(id: string): Promise<void>;
  fulfillFoodRequest(id: string): Promise<void>;
  cancelFoodRequest(id: string): Promise<void>;
}

export interface FoodItemServicePort {
  validateFoodItems(
    items: Array<{ foodItemId: string; quantity: number }>,
  ): Promise<boolean>;
  calculateTotalAmount(
    items: Array<{ foodItemId: string; quantity: number }>,
  ): Promise<number>;
}
