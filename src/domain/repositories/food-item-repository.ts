import { FoodItem } from '../entities/food-item';
import { FoodItemId } from '../value-objects/food-item-id';

export interface FoodItemRepository {
  save(foodItem: FoodItem): Promise<void>;
  findById(id: FoodItemId): Promise<FoodItem | null>;
  findByCategory(category: string): Promise<FoodItem[]>;
  findAll(): Promise<FoodItem[]>;
  delete(id: FoodItemId): Promise<void>;
}
