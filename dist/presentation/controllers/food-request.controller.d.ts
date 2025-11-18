import { CreateFoodRequestDto } from "../dto/create-food-request.dto";
import { FoodRequestResponseDto } from "../dto/food-request-response.dto";
import { CreateFoodRequestUseCase } from "@application/use-cases/create-food-request.use-case";
import { GetFoodRequestUseCase } from "@application/use-cases/get-food-request.use-case";
import { UpdateFoodRequestStatusUseCase } from "@application/use-cases/update-food-request-status.use-case";
export declare class FoodRequestController {
    private readonly createFoodRequestUseCase;
    private readonly getFoodRequestUseCase;
    private readonly updateFoodRequestStatusUseCase;
    constructor(createFoodRequestUseCase: CreateFoodRequestUseCase, getFoodRequestUseCase: GetFoodRequestUseCase, updateFoodRequestStatusUseCase: UpdateFoodRequestStatusUseCase);
    createFoodRequest(createFoodRequestDto: CreateFoodRequestDto): Promise<FoodRequestResponseDto>;
    getFoodRequestById(id: string): Promise<FoodRequestResponseDto>;
    getFoodRequestsByCustomerId(customerId: string): Promise<FoodRequestResponseDto[]>;
    approveFoodRequest(id: string): Promise<void>;
    rejectFoodRequest(id: string): Promise<void>;
    fulfillFoodRequest(id: string): Promise<void>;
    cancelFoodRequest(id: string): Promise<void>;
    private mapToResponseDto;
}
