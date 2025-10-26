import { CIRCUIT_BREAKER_KEY } from "@infrastructure/decorator/circuit-breaker.interceptor";
import { CircuitBreakerService } from "@infrastructure/service/circuit-breaker.service";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CircuitBreakerInterceptor.name);

  constructor(
    private readonly circuitBreakerService: CircuitBreakerService,
    private readonly reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const circuitBreakerConfig = this.reflector.getAllAndOverride<{
      operationType?: "read" | "write" | "delete" | "update";
    }>(CIRCUIT_BREAKER_KEY, [context.getHandler(), context.getClass()]);

    if (!circuitBreakerConfig) {
      return next.handle();
    }

    const { operationType } = circuitBreakerConfig;
    const methodName = context.getHandler().name;
    const className = context.getClass().name;
    const circuitBreakerName = `${className}.${methodName}`;

    let circuitBreaker =
      this.circuitBreakerService.getCircuitBreaker(circuitBreakerName);

    if (!circuitBreaker) {
      circuitBreaker = this.circuitBreakerService.createCircuitBreaker(
        circuitBreakerName,
        () => next.handle().toPromise(),
        operationType
      );
    }

    return new Observable((observer) => {
      circuitBreaker
        .fire()
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    }).pipe(
      catchError((error) => {
        if (error.code === "ECIRCUITOPEN") {
          this.logger.warn(
            `Circuit breaker ${circuitBreakerName} is open - Service unavailable`
          );
          return throwError(
            () =>
              new Error(
                "Service temporarily unavailable. Please try again later"
              )
          );
        }

        return throwError(() => error);
      })
    );
  }
}