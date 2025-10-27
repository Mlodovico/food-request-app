import { CircuitBreakerService } from "@infrastructure/service/circuit-breaker.service";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
export declare class CircuitBreakerInterceptor implements NestInterceptor {
    private readonly circuitBreakerService;
    private readonly reflector;
    private readonly logger;
    constructor(circuitBreakerService: CircuitBreakerService, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
