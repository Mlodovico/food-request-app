import { CIRCUIT_BREAKER_KEY } from "@infrastructure/decorator/circuit-breaker.interceptor";
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(CircuitBreakerInterceptor.name);

    constructor(
        private readonly circuitBreakerService: CircuitBreakerInterceptor,
        private readonly reflector: Reflector
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const circuitBreakerConfig = this.reflector.getAllAndOverride<{
            operationType?: 'read'| 'write' | 'detele'| 'update';
        }>(
            CIRCUIT_BREAKER_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!circuitBreakerConfig) {
            return next.handle();
        }
        
    }

}