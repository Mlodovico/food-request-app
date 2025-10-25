import { FoodItemId } from '../value-objects/food-item-id';
import { Quantity } from '../value-objects/quantity';

export class FoodRequestItem {
  constructor(
    private readonly foodItemId: FoodItemId,
    private readonly quantity: Quantity,
    private readonly specialInstructions?: string
  ) {}

  getFoodItemId(): FoodItemId {
    return this.foodItemId;
  }

  getQuantity(): Quantity {
    return this.quantity;
  }

  getSpecialInstructions(): string | undefined {
    return this.specialInstructions;
  }

  equals(other: FoodRequestItem): boolean {
    return this.foodItemId.equals(other.foodItemId);
  }
}
