import { CircuitBreakerService } from "@infrastructure/service/circuit-breaker.service";
export declare class HealthController {
    private readonly circuitBreakerService;
    constructor(circuitBreakerService: CircuitBreakerService);
    getCircuitBreakerStatus(): {};
}
