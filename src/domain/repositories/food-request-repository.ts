import { FoodRequest } from '../entities/food-request';
import { RequestId } from '../value-objects/request-id';
import { FoodRequestStatus } from '../value-objects/food-request-status';

export interface FoodRequestRepository {
  save(foodRequest: FoodRequest): Promise<void>;
  findById(id: RequestId): Promise<FoodRequest | null>;
  findByCustomerId(customerId: string): Promise<FoodRequest[]>;
  findByStatus(status: FoodRequestStatus): Promise<FoodRequest[]>;
  findAll(): Promise<FoodRequest[]>;
  delete(id: RequestId): Promise<void>;
}
