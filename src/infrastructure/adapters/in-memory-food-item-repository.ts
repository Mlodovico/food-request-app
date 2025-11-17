import { Injectable } from "@nestjs/common";
import { FoodItem } from "@domain/entities/food-item";
import { FoodItemId } from "@domain/value-objects/food-item-id";
import { FoodItemRepository } from "@domain/repositories/food-item-repository";

@Injectable()
export class InMemoryFoodItemRepository implements FoodItemRepository {
  private foodItems: Map<string, FoodItem> = new Map();

  constructor() {
    // Initialize with some sample food items
    this.initializeSampleData();
  }

  async save(foodItem: FoodItem): Promise<void> {
    this.foodItems.set(foodItem.getId().getValue(), foodItem);
  }

  async findById(id: FoodItemId): Promise<FoodItem | null> {
    return this.foodItems.get(id.getValue()) || null;
  }

  async findByCategory(category: string): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      (item) => item.getCategory() === category,
    );
  }

  async findAll(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async delete(id: FoodItemId): Promise<void> {
    this.foodItems.delete(id.getValue());
  }

  private initializeSampleData(): void {
    const sampleItems = [
      {
        id: "ITEM-001",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        category: "Pizza",
      },
      {
        id: "ITEM-002",
        name: "Pepperoni Pizza",
        description: "Pizza topped with pepperoni and mozzarella cheese",
        price: 14.99,
        category: "Pizza",
      },
      {
        id: "ITEM-003",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with caesar dressing and croutons",
        price: 8.99,
        category: "Salad",
      },
      {
        id: "ITEM-004",
        name: "Chicken Burger",
        description: "Grilled chicken breast with lettuce, tomato, and mayo",
        price: 11.99,
        category: "Burger",
      },
      {
        id: "ITEM-005",
        name: "Chocolate Cake",
        description: "Rich chocolate cake with chocolate frosting",
        price: 6.99,
        category: "Dessert",
      },
    ];

    sampleItems.forEach((item) => {
      const foodItem = new FoodItem(
        new FoodItemId(item.id),
        item.name,
        item.description,
        item.price,
        item.category,
      );
      this.foodItems.set(item.id, foodItem);
    });
  }
}
