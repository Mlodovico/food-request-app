import { FoodItemId } from "../value-objects/food-item-id";
import { Quantity } from "../value-objects/quantity";
export declare class FoodRequestItem {
    private readonly foodItemId;
    private readonly quantity;
    private readonly specialInstructions?;
    constructor(foodItemId: FoodItemId, quantity: Quantity, specialInstructions?: string);
    getFoodItemId(): FoodItemId;
    getQuantity(): Quantity;
    getSpecialInstructions(): string | undefined;
    equals(other: FoodRequestItem): boolean;
}
