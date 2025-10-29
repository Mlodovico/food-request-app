import { Controller, Post, Get, Put, Body, Param, HttpStatus, HttpCode, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateFoodRequestDto } from '../dto/create-food-request.dto';
import { FoodRequestResponseDto, FoodRequestItemResponseDto } from '../dto/food-request-response.dto';
import { CreateFoodRequestUseCase } from '@application/use-cases/create-food-request.use-case';
import { GetFoodRequestUseCase } from '@application/use-cases/get-food-request.use-case';
import { UpdateFoodRequestStatusUseCase } from '@application/use-cases/update-food-request-status.use-case';
import { Throttle } from "@nestjs/throttler";
import { CircuitBreaker } from "@infrastructure/decorator/circuit-breaker.interceptor";

@Controller("food-requests")
export class FoodRequestController {
  constructor(
    private readonly createFoodRequestUseCase: CreateFoodRequestUseCase,
    private readonly getFoodRequestUseCase: GetFoodRequestUseCase,
    private readonly updateFoodRequestStatusUseCase: UpdateFoodRequestStatusUseCase
  ) {}

  @Post("order")
  @CircuitBreaker("write")
  @Throttle({ short: { limit: 5, ttl: 1000 } })
  @HttpCode(HttpStatus.CREATED)
  async createFoodRequest(
    @Body() createFoodRequestDto: CreateFoodRequestDto
  ): Promise<FoodRequestResponseDto> {
    try {
      const foodRequest = await this.createFoodRequestUseCase.createFoodRequest(
        createFoodRequestDto.customerId,
        createFoodRequestDto.items,
        createFoodRequestDto.notes
      );

      return this.mapToResponseDto(foodRequest);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get("get-order/:id")
  @CircuitBreaker("read")
  @Throttle({ long: { limit: 60, ttl: 1000 } })
  async getFoodRequestById(
    @Param("id") id: string
  ): Promise<FoodRequestResponseDto> {
    const foodRequest = await this.getFoodRequestUseCase.getFoodRequestById(id);

    if (!foodRequest) {
      throw new NotFoundException("Food request not found");
    }

    return this.mapToResponseDto(foodRequest);
  }

  @Get("customer/:customerId")
  @CircuitBreaker("read")
  @Throttle({ medium: { limit: 20, ttl: 1000 } })
  async getFoodRequestsByCustomerId(
    @Param("customerId") customerId: string
  ): Promise<FoodRequestResponseDto[]> {
    const foodRequests =
      await this.getFoodRequestUseCase.getFoodRequestsByCustomerId(customerId);

    return foodRequests.map((request) => this.mapToResponseDto(request));
  }

  @Put(":id/approve")
  @CircuitBreaker("update")
  @Throttle({ short: { limit: 3, ttl: 1000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async approveFoodRequest(@Param("id") id: string): Promise<void> {
    try {
      await this.updateFoodRequestStatusUseCase.approveFoodRequest(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id/reject")
  @CircuitBreaker("delete")
  @Throttle({ short: { limit: 3, ttl: 1000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectFoodRequest(@Param("id") id: string): Promise<void> {
    try {
      await this.updateFoodRequestStatusUseCase.rejectFoodRequest(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id/fulfill")
  @CircuitBreaker("update")
  @Throttle({ short: { limit: 5, ttl: 1000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async fulfillFoodRequest(@Param("id") id: string): Promise<void> {
    try {
      await this.updateFoodRequestStatusUseCase.fulfillFoodRequest(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id/cancel")
  @CircuitBreaker("delete")
  @Throttle({ short: { limit: 6, ttl: 1000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelFoodRequest(@Param("id") id: string): Promise<void> {
    try {
      await this.updateFoodRequestStatusUseCase.cancelFoodRequest(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private mapToResponseDto(foodRequest: any): FoodRequestResponseDto {
    const items = foodRequest
      .getItems()
      .map(
        (item: any) =>
          new FoodRequestItemResponseDto(
            item.getFoodItemId().getValue(),
            item.getQuantity().getValue(),
            item.getSpecialInstructions()
          )
      );

    return new FoodRequestResponseDto(
      foodRequest.getId().getValue(),
      foodRequest.getCustomerId(),
      items,
      foodRequest.getStatus(),
      foodRequest.getCreatedAt(),
      foodRequest.getUpdatedAt(),
      foodRequest.getTotalAmount(),
      foodRequest.getNotes()
    );
  }
}
