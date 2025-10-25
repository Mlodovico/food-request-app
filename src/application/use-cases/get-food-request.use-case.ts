import { Injectable, Inject } from '@nestjs/common';
import { FoodRequest } from '@domain/entities/food-request';
import { RequestId } from '@domain/value-objects/request-id';
import { FoodRequestRepository } from '@domain/repositories/food-request-repository';
import { GetFoodRequestPort } from '../ports/food-request.ports';

@Injectable()
export class GetFoodRequestUseCase implements GetFoodRequestPort {
  constructor(
    @Inject('FoodRequestRepository')
    private readonly foodRequestRepository: FoodRequestRepository
  ) {}

  async getFoodRequestById(id: string): Promise<FoodRequest | null> {
    const requestId = new RequestId(id);
    return await this.foodRequestRepository.findById(requestId);
  }

  async getFoodRequestsByCustomerId(customerId: string): Promise<FoodRequest[]> {
    return await this.foodRequestRepository.findByCustomerId(customerId);
  }
}
