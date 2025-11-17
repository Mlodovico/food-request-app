import { RequestId } from "../value-objects/request-id";
import { FoodRequestStatus } from "../value-objects/food-request-status";
import { FoodRequestItem } from "./food-request-item";

export class FoodRequest {
  constructor(
    private readonly id: RequestId,
    private readonly customerId: string,
    private readonly items: FoodRequestItem[],
    private status: FoodRequestStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private readonly totalAmount: number,
    private notes?: string,
  ) {
    if (!customerId || customerId.trim().length === 0) {
      throw new Error("Customer ID cannot be empty");
    }
    if (!items || items.length === 0) {
      throw new Error("Food request must have at least one item");
    }
    if (totalAmount < 0) {
      throw new Error("Total amount cannot be negative");
    }
  }

  getId(): RequestId {
    return this.id;
  }

  getCustomerId(): string {
    return this.customerId;
  }

  getItems(): FoodRequestItem[] {
    return [...this.items];
  }

  getStatus(): FoodRequestStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  getNotes(): string | undefined {
    return this.notes;
  }

  approve(): void {
    if (this.status !== FoodRequestStatus.PENDING) {
      throw new Error("Only pending requests can be approved");
    }
    this.status = FoodRequestStatus.APPROVED;
    this.updatedAt = new Date();
  }

  reject(): void {
    if (this.status !== FoodRequestStatus.PENDING) {
      throw new Error("Only pending requests can be rejected");
    }
    this.status = FoodRequestStatus.REJECTED;
    this.updatedAt = new Date();
  }

  fulfill(): void {
    if (this.status !== FoodRequestStatus.APPROVED) {
      throw new Error("Only approved requests can be fulfilled");
    }
    this.status = FoodRequestStatus.FULFILLED;
    this.updatedAt = new Date();
  }

  cancel(): void {
    if (this.status === FoodRequestStatus.FULFILLED) {
      throw new Error("Fulfilled requests cannot be cancelled");
    }
    this.status = FoodRequestStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  updateNotes(notes: string): void {
    this.notes = notes;
    this.updatedAt = new Date();
  }

  equals(other: FoodRequest): boolean {
    return this.id.equals(other.id);
  }
}
