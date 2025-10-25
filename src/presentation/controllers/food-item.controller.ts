import { Controller, Get, Param, Inject } from '@nestjs/common';
import { FoodItemRepository } from '@domain/repositories/food-item-repository';
import { FoodItemId } from '@domain/value-objects/food-item-id';

export class FoodItemResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;

  constructor(id: string, name: string, description: string, price: number, category: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}

@Controller('food-items')
export class FoodItemController {
  constructor(
    @Inject('FoodItemRepository')
    private readonly foodItemRepository: FoodItemRepository
  ) {}

  @Get()
  async getAllFoodItems(): Promise<FoodItemResponseDto[]> {
    const foodItems = await this.foodItemRepository.findAll();
    
    return foodItems.map(item => new FoodItemResponseDto(
      item.getId().getValue(),
      item.getName(),
      item.getDescription(),
      item.getPrice(),
      item.getCategory()
    ));
  }

  @Get(':id')
  async getFoodItemById(@Param('id') id: string): Promise<FoodItemResponseDto> {
    const foodItemId = new FoodItemId(id);
    const foodItem = await this.foodItemRepository.findById(foodItemId);
    
    if (!foodItem) {
      throw new Error('Food item not found');
    }

    return new FoodItemResponseDto(
      foodItem.getId().getValue(),
      foodItem.getName(),
      foodItem.getDescription(),
      foodItem.getPrice(),
      foodItem.getCategory()
    );
  }

  @Get('category/:category')
  async getFoodItemsByCategory(@Param('category') category: string): Promise<FoodItemResponseDto[]> {
    const foodItems = await this.foodItemRepository.findByCategory(category);
    
    return foodItems.map(item => new FoodItemResponseDto(
      item.getId().getValue(),
      item.getName(),
      item.getDescription(),
      item.getPrice(),
      item.getCategory()
    ));
  }
}
