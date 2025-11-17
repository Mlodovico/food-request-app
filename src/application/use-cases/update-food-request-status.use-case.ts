import { Injectable, Inject } from "@nestjs/common";
import { RequestId } from "@domain/value-objects/request-id";
import { FoodRequestRepository } from "@domain/repositories/food-request-repository";
import { UpdateFoodRequestStatusPort } from "../ports/food-request.ports";

@Injectable()
export class UpdateFoodRequestStatusUseCase
  implements UpdateFoodRequestStatusPort
{
  constructor(
    @Inject("FoodRequestRepository")
    private readonly foodRequestRepository: FoodRequestRepository,
  ) {}

  async approveFoodRequest(id: string): Promise<void> {
    const requestId = new RequestId(id);
    const foodRequest = await this.foodRequestRepository.findById(requestId);

    if (!foodRequest) {
      throw new Error("Food request not found");
    }

    foodRequest.approve();
    await this.foodRequestRepository.save(foodRequest);
  }

  async rejectFoodRequest(id: string): Promise<void> {
    const requestId = new RequestId(id);
    const foodRequest = await this.foodRequestRepository.findById(requestId);

    if (!foodRequest) {
      throw new Error("Food request not found");
    }

    foodRequest.reject();
    await this.foodRequestRepository.save(foodRequest);
  }

  async fulfillFoodRequest(id: string): Promise<void> {
    const requestId = new RequestId(id);
    const foodRequest = await this.foodRequestRepository.findById(requestId);

    if (!foodRequest) {
      throw new Error("Food request not found");
    }

    foodRequest.fulfill();
    await this.foodRequestRepository.save(foodRequest);
  }

  async cancelFoodRequest(id: string): Promise<void> {
    const requestId = new RequestId(id);
    const foodRequest = await this.foodRequestRepository.findById(requestId);

    if (!foodRequest) {
      throw new Error("Food request not found");
    }

    foodRequest.cancel();
    await this.foodRequestRepository.save(foodRequest);
  }
}
