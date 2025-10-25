import { Injectable } from '@nestjs/common';
import { FoodRequest } from '@domain/entities/food-request';
import { RequestId } from '@domain/value-objects/request-id';
import { FoodRequestStatus } from '@domain/value-objects/food-request-status';
import { FoodRequestRepository } from '@domain/repositories/food-request-repository';

@Injectable()
export class InMemoryFoodRequestRepository implements FoodRequestRepository {
  private foodRequests: Map<string, FoodRequest> = new Map();

  async save(foodRequest: FoodRequest): Promise<void> {
    this.foodRequests.set(foodRequest.getId().getValue(), foodRequest);
  }

  async findById(id: RequestId): Promise<FoodRequest | null> {
    return this.foodRequests.get(id.getValue()) || null;
  }

  async findByCustomerId(customerId: string): Promise<FoodRequest[]> {
    return Array.from(this.foodRequests.values())
      .filter(request => request.getCustomerId() === customerId);
  }

  async findByStatus(status: FoodRequestStatus): Promise<FoodRequest[]> {
    return Array.from(this.foodRequests.values())
      .filter(request => request.getStatus() === status);
  }

  async findAll(): Promise<FoodRequest[]> {
    return Array.from(this.foodRequests.values());
  }

  async delete(id: RequestId): Promise<void> {
    this.foodRequests.delete(id.getValue());
  }
}
