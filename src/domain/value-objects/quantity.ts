export class Quantity {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (!Number.isInteger(value)) {
      throw new Error('Quantity must be an integer');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Quantity): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
