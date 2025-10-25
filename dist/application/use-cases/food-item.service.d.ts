import { FoodItemRepository } from '@domain/repositories/food-item-repository';
import { FoodItemServicePort } from '../ports/food-request.ports';
export declare class FoodItemService implements FoodItemServicePort {
    private readonly foodItemRepository;
    constructor(foodItemRepository: FoodItemRepository);
    validateFoodItems(items: Array<{
        foodItemId: string;
        quantity: number;
    }>): Promise<boolean>;
    calculateTotalAmount(items: Array<{
        foodItemId: string;
        quantity: number;
    }>): Promise<number>;
}
