"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRequestModule = void 0;
const common_1 = require("@nestjs/common");
const food_request_controller_1 = require("./presentation/controllers/food-request.controller");
const food_item_controller_1 = require("./presentation/controllers/food-item.controller");
const create_food_request_use_case_1 = require("./application/use-cases/create-food-request.use-case");
const get_food_request_use_case_1 = require("./application/use-cases/get-food-request.use-case");
const update_food_request_status_use_case_1 = require("./application/use-cases/update-food-request-status.use-case");
const food_item_service_1 = require("./application/use-cases/food-item.service");
const in_memory_food_request_repository_1 = require("./infrastructure/adapters/in-memory-food-request-repository");
const in_memory_food_item_repository_1 = require("./infrastructure/adapters/in-memory-food-item-repository");
let FoodRequestModule = class FoodRequestModule {
};
exports.FoodRequestModule = FoodRequestModule;
exports.FoodRequestModule = FoodRequestModule = __decorate([
    (0, common_1.Module)({
        controllers: [food_request_controller_1.FoodRequestController, food_item_controller_1.FoodItemController],
        providers: [
            create_food_request_use_case_1.CreateFoodRequestUseCase,
            get_food_request_use_case_1.GetFoodRequestUseCase,
            update_food_request_status_use_case_1.UpdateFoodRequestStatusUseCase,
            food_item_service_1.FoodItemService,
            {
                provide: 'FoodRequestRepository',
                useClass: in_memory_food_request_repository_1.InMemoryFoodRequestRepository,
            },
            {
                provide: 'FoodItemRepository',
                useClass: in_memory_food_item_repository_1.InMemoryFoodItemRepository,
            },
            {
                provide: 'FoodRequestRepositoryInterface',
                useExisting: 'FoodRequestRepository',
            },
            {
                provide: 'FoodItemRepositoryInterface',
                useExisting: 'FoodItemRepository',
            },
        ],
    })
], FoodRequestModule);
//# sourceMappingURL=food-request.module.js.map