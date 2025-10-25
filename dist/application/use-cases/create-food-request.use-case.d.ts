import { FoodRequest } from '@domain/entities/food-request';
import { FoodRequestRepository } from '@domain/repositories/food-request-repository';
import { CreateFoodRequestPort, FoodItemServicePort } from '../ports/food-request.ports';
export declare class CreateFoodRequestUseCase implements CreateFoodRequestPort {
    private readonly foodRequestRepository;
    private readonly foodItemService;
    constructor(foodRequestRepository: FoodRequestRepository, foodItemService: FoodItemServicePort);
    createFoodRequest(customerId: string, items: Array<{
        foodItemId: string;
        quantity: number;
        specialInstructions?: string;
    }>, notes?: string): Promise<FoodRequest>;
    private generateRequestId;
}
