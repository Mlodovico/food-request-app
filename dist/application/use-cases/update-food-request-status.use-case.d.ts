import { FoodRequestRepository } from "@domain/repositories/food-request-repository";
import { UpdateFoodRequestStatusPort } from "../ports/food-request.ports";
export declare class UpdateFoodRequestStatusUseCase implements UpdateFoodRequestStatusPort {
    private readonly foodRequestRepository;
    constructor(foodRequestRepository: FoodRequestRepository);
    approveFoodRequest(id: string): Promise<void>;
    rejectFoodRequest(id: string): Promise<void>;
    fulfillFoodRequest(id: string): Promise<void>;
    cancelFoodRequest(id: string): Promise<void>;
}
