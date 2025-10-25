import { FoodItemId } from '../value-objects/food-item-id';
export declare class FoodItem {
    private readonly id;
    private readonly name;
    private readonly description;
    private readonly price;
    private readonly category;
    constructor(id: FoodItemId, name: string, description: string, price: number, category: string);
    getId(): FoodItemId;
    getName(): string;
    getDescription(): string;
    getPrice(): number;
    getCategory(): string;
    equals(other: FoodItem): boolean;
}
