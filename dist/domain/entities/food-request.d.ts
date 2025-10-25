import { RequestId } from '../value-objects/request-id';
import { FoodRequestStatus } from '../value-objects/food-request-status';
import { FoodRequestItem } from './food-request-item';
export declare class FoodRequest {
    private readonly id;
    private readonly customerId;
    private readonly items;
    private status;
    private readonly createdAt;
    private updatedAt;
    private readonly totalAmount;
    private notes?;
    constructor(id: RequestId, customerId: string, items: FoodRequestItem[], status: FoodRequestStatus, createdAt: Date, updatedAt: Date, totalAmount: number, notes?: string);
    getId(): RequestId;
    getCustomerId(): string;
    getItems(): FoodRequestItem[];
    getStatus(): FoodRequestStatus;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    getTotalAmount(): number;
    getNotes(): string | undefined;
    approve(): void;
    reject(): void;
    fulfill(): void;
    cancel(): void;
    updateNotes(notes: string): void;
    equals(other: FoodRequest): boolean;
}
