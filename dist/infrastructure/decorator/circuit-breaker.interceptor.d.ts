export declare const CIRCUIT_BREAKER_KEY = "circuitBreaker";
export declare const CircuitBreaker: (operationType?: "read" | "write" | "delete" | "update") => import("@nestjs/common").CustomDecorator<string>;
