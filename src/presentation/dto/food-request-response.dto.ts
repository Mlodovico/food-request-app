export class FoodRequestItemResponseDto {
  foodItemId: string;
  quantity: number;
  specialInstructions?: string;

  constructor(foodItemId: string, quantity: number, specialInstructions?: string) {
    this.foodItemId = foodItemId;
    this.quantity = quantity;
    this.specialInstructions = specialInstructions;
  }
}

export class FoodRequestResponseDto {
  id: string;
  customerId: string;
  items: FoodRequestItemResponseDto[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  notes?: string;

  constructor(
    id: string,
    customerId: string,
    items: FoodRequestItemResponseDto[],
    status: string,
    createdAt: Date,
    updatedAt: Date,
    totalAmount: number,
    notes?: string
  ) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.totalAmount = totalAmount;
    this.notes = notes;
  }
}
