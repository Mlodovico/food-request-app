import CircuitBreaker from "opossum";
export declare class CircuitBreakerService {
    private readonly logger;
    private circuitBreakers;
    createCircuitBreaker(name: string, operation: Function, operationType?: "read" | "write" | "delete" | "update"): CircuitBreaker;
    private getConfigByOperationType;
    private setupCircuitBreakerEvents;
    getCircuitBreaker(name: string): CircuitBreaker | undefined;
    getAllCircuitBreakers(): Map<string, CircuitBreaker>;
}
