import { CircuitBreakerService } from "@infrastructure/service/circuit-breaker.service";
import { Controller, Get } from "@nestjs/common";


@Controller("health")
export class HealthController {
  constructor(private readonly circuitBreakerService: CircuitBreakerService) {}

  @Get("circuit-breaker")
  getCircuitBreakerStatus() {
    const circuitBreakers = this.circuitBreakerService.getAllCircuitBreakers();
    const status = {};

    const circuitBreakerMap = circuitBreakers; // circuitBreakers is already a Map
    circuitBreakerMap.forEach((cb, name) => {
      status[name] = {
        state: cb.status,
        stats: cb.stats,
        options: (cb as any)._options,
      };
    });

    return status;
  }
}