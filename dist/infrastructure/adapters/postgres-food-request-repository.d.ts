import { FoodRequest } from '@domain/entities/food-request';
import { RequestId } from '@domain/value-objects/request-id';
import { FoodRequestStatus } from '@domain/value-objects/food-request-status';
import { FoodRequestRepository } from '@domain/repositories/food-request-repository';
export declare class PostgresFoodRequestRepository implements FoodRequestRepository {
    private pool;
    constructor();
    save(foodRequest: FoodRequest): Promise<void>;
    findById(id: RequestId): Promise<FoodRequest | null>;
    findByCustomerId(customerId: string): Promise<FoodRequest[]>;
    findByStatus(status: FoodRequestStatus): Promise<FoodRequest[]>;
    findAll(): Promise<FoodRequest[]>;
    delete(id: RequestId): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
