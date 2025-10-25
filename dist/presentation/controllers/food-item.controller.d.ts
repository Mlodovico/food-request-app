import { FoodItemRepository } from '@domain/repositories/food-item-repository';
export declare class FoodItemResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    constructor(id: string, name: string, description: string, price: number, category: string);
}
export declare class FoodItemController {
    private readonly foodItemRepository;
    constructor(foodItemRepository: FoodItemRepository);
    getAllFoodItems(): Promise<FoodItemResponseDto[]>;
    getFoodItemById(id: string): Promise<FoodItemResponseDto>;
    getFoodItemsByCategory(category: string): Promise<FoodItemResponseDto[]>;
}
