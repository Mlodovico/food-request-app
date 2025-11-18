import { FoodItem } from "@domain/entities/food-item";
import { FoodItemId } from "@domain/value-objects/food-item-id";
import { FoodItemRepository } from "@domain/repositories/food-item-repository";
export declare class InMemoryFoodItemRepository implements FoodItemRepository {
    private foodItems;
    constructor();
    save(foodItem: FoodItem): Promise<void>;
    findById(id: FoodItemId): Promise<FoodItem | null>;
    findByCategory(category: string): Promise<FoodItem[]>;
    findAll(): Promise<FoodItem[]>;
    delete(id: FoodItemId): Promise<void>;
    private initializeSampleData;
}
