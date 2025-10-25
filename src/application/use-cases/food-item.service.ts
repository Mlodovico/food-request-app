import { Injectable, Inject } from '@nestjs/common';
import { FoodItemRepository } from '@domain/repositories/food-item-repository';
import { FoodItemId } from '@domain/value-objects/food-item-id';
import { FoodItemServicePort } from '../ports/food-request.ports';

@Injectable()
export class FoodItemService implements FoodItemServicePort {
  constructor(
    @Inject('FoodItemRepository')
    private readonly foodItemRepository: FoodItemRepository
  ) {}

  async validateFoodItems(items: Array<{ foodItemId: string; quantity: number }>): Promise<boolean> {
    for (const item of items) {
      const foodItemId = new FoodItemId(item.foodItemId);
      const foodItem = await this.foodItemRepository.findById(foodItemId);
      
      if (!foodItem) {
        return false;
      }
    }
    return true;
  }

  async calculateTotalAmount(items: Array<{ foodItemId: string; quantity: number }>): Promise<number> {
    let totalAmount = 0;

    for (const item of items) {
      const foodItemId = new FoodItemId(item.foodItemId);
      const foodItem = await this.foodItemRepository.findById(foodItemId);
      
      if (foodItem) {
        totalAmount += foodItem.getPrice() * item.quantity;
      }
    }

    return totalAmount;
  }
}
