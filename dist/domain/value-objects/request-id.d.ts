export declare class RequestId {
    private readonly value;
    constructor(value: string);
    getValue(): string;
    equals(other: RequestId): boolean;
    toString(): string;
}
