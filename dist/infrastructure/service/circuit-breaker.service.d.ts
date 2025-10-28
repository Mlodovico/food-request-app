declare const CircuitBreaker: any;
export declare class CircuitBreakerService {
    private readonly logger;
    private circuitBreakers;
    createCircuitBreaker(name: string, operation: (...args: unknown[]) => Promise<unknown>, operationType?: "read" | "write" | "delete" | "update"): InstanceType<typeof CircuitBreaker>;
    private getConfigByOperationType;
    private setupCircuitBreakerEvents;
    getCircuitBreaker(name: string): any;
    getAllCircuitBreakers(): Map<string, any>;
}
export {};
