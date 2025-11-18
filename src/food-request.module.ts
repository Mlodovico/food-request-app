import { Module } from "@nestjs/common";
import { FoodRequestController } from "@presentation/controllers/food-request.controller";
import { FoodItemController } from "@presentation/controllers/food-item.controller";
import { CreateFoodRequestUseCase } from "@application/use-cases/create-food-request.use-case";
import { GetFoodRequestUseCase } from "@application/use-cases/get-food-request.use-case";
import { UpdateFoodRequestStatusUseCase } from "@application/use-cases/update-food-request-status.use-case";
import { FoodItemService } from "@application/use-cases/food-item.service";
import { InMemoryFoodRequestRepository } from "@infrastructure/adapters/in-memory-food-request-repository";
import { InMemoryFoodItemRepository } from "@infrastructure/adapters/in-memory-food-item-repository";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { throttlerConfig } from "@infrastructure/middleware/throttler.config";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [ThrottlerModule.forRoot(throttlerConfig)],
  controllers: [FoodRequestController, FoodItemController],
  providers: [
    // Use Cases
    CreateFoodRequestUseCase,
    GetFoodRequestUseCase,
    UpdateFoodRequestStatusUseCase,
    FoodItemService,

    // Rate Limiter
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    // Repository implementations
    {
      provide: "FoodRequestRepository",
      useClass: InMemoryFoodRequestRepository,
    },
    {
      provide: "FoodItemRepository",
      useClass: InMemoryFoodItemRepository,
    },

    // Repository interfaces
    {
      provide: "FoodRequestRepositoryInterface",
      useExisting: "FoodRequestRepository",
    },
    {
      provide: "FoodItemRepositoryInterface",
      useExisting: "FoodItemRepository",
    },
  ],
})
export class FoodRequestModule {}
