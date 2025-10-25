export class FoodItemId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('FoodItemId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: FoodItemId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
