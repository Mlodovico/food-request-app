export declare class CreateFoodRequestItemDto {
    foodItemId: string;
    quantity: number;
    specialInstructions?: string;
}
export declare class CreateFoodRequestDto {
    customerId: string;
    items: CreateFoodRequestItemDto[];
    notes?: string;
}
