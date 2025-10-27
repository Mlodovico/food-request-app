import { Injectable, Inject } from "@nestjs/common";
import { FoodRequest } from "@domain/entities/food-request";
import { FoodRequestItem } from "@domain/entities/food-request-item";
import { RequestId } from "@domain/value-objects/request-id";
import { FoodItemId } from "@domain/value-objects/food-item-id";
import { Quantity } from "@domain/value-objects/quantity";
import { FoodRequestStatus } from "@domain/value-objects/food-request-status";
import { FoodRequestRepository } from "@domain/repositories/food-request-repository";
import { FoodItemRepository } from "@domain/repositories/food-item-repository";
import {
  CreateFoodRequestPort,
  GetFoodRequestPort,
  UpdateFoodRequestStatusPort,
  FoodItemServicePort,
} from "../ports/food-request.ports";
import { FoodItemService } from "@application/use-cases/food-item.service";

@Injectable()
export class CreateFoodRequestUseCase implements CreateFoodRequestPort {
  constructor(
    @Inject("FoodRequestRepository")
    private readonly foodRequestRepository: FoodRequestRepository,
    private readonly foodItemService: FoodItemService
  ) {}

  async createFoodRequest(
    customerId: string,
    items: Array<{
      foodItemId: string;
      quantity: number;
      specialInstructions?: string;
    }>,
    notes?: string
  ): Promise<FoodRequest> {
    // Validate food items exist
    const isValid = await this.foodItemService.validateFoodItems(items);
    if (!isValid) {
      throw new Error("One or more food items are invalid");
    }

    // Calculate total amount
    const totalAmount = await this.foodItemService.calculateTotalAmount(items);

    // Create food request items
    const foodRequestItems = items.map(
      (item) =>
        new FoodRequestItem(
          new FoodItemId(item.foodItemId),
          new Quantity(item.quantity),
          item.specialInstructions
        )
    );

    // Generate unique request ID
    const requestId = new RequestId(this.generateRequestId());

    // Create food request
    const foodRequest = new FoodRequest(
      requestId,
      customerId,
      foodRequestItems,
      FoodRequestStatus.PENDING,
      new Date(),
      new Date(),
      totalAmount,
      notes
    );

    // Save to repository
    await this.foodRequestRepository.save(foodRequest);

    return foodRequest;
  }

  private generateRequestId(): string {
    return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
