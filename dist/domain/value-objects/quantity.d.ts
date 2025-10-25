export declare class Quantity {
    private readonly value;
    constructor(value: number);
    getValue(): number;
    equals(other: Quantity): boolean;
    toString(): string;
}
