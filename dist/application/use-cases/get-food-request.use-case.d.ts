import { FoodRequest } from "@domain/entities/food-request";
import { FoodRequestRepository } from "@domain/repositories/food-request-repository";
import { GetFoodRequestPort } from "../ports/food-request.ports";
export declare class GetFoodRequestUseCase implements GetFoodRequestPort {
    private readonly foodRequestRepository;
    constructor(foodRequestRepository: FoodRequestRepository);
    getFoodRequestById(id: string): Promise<FoodRequest | null>;
    getFoodRequestsByCustomerId(customerId: string): Promise<FoodRequest[]>;
}
