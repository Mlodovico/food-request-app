export declare class FoodRequestItemResponseDto {
    foodItemId: string;
    quantity: number;
    specialInstructions?: string;
    constructor(foodItemId: string, quantity: number, specialInstructions?: string);
}
export declare class FoodRequestResponseDto {
    id: string;
    customerId: string;
    items: FoodRequestItemResponseDto[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    totalAmount: number;
    notes?: string;
    constructor(id: string, customerId: string, items: FoodRequestItemResponseDto[], status: string, createdAt: Date, updatedAt: Date, totalAmount: number, notes?: string);
}
