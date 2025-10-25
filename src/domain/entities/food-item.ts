import { FoodItemId } from '../value-objects/food-item-id';

export class FoodItem {
  constructor(
    private readonly id: FoodItemId,
    private readonly name: string,
    private readonly description: string,
    private readonly price: number,
    private readonly category: string
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error('Food item name cannot be empty');
    }
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (!category || category.trim().length === 0) {
      throw new Error('Category cannot be empty');
    }
  }

  getId(): FoodItemId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  getCategory(): string {
    return this.category;
  }

  equals(other: FoodItem): boolean {
    return this.id.equals(other.id);
  }
}
