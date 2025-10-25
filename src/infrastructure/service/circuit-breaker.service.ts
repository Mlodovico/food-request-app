import { Injectable, Logger } from "@nestjs/common";
import CircuitBreaker from "opossum";

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private circuitBreakers: Map<string, CircuitBreaker> = new Map();

  createCircuitBreaker(
    name: string,
    operation: Function,
    operationType?: "read" | "write" | "delete" | "update"
  ): CircuitBreaker {
    const config = this.getConfigByOperationType(operationType);

    const circuitBreaker = new CircuitBreaker(operation, config);

    this.setupCircuitBreakerEvents(circuitBreaker, name);
    this.circuitBreakers.set(name, circuitBreaker);

    return circuitBreaker;
  }

  private getConfigByOperationType(type?: string) {
     const baseConfig = {
       rollingCountTimeout: 10000,
       rollingCountBuckets: 10,
     };

     switch (type) {
       case "read":
         return {
           ...baseConfig,
           timeout: 2000, // Leitura rápida
           errorThresholdPercentage: 40, // Mais tolerante a falhas temporárias
           resetTimeout: 15000, // Recuperação rápida
         };
       case "write":
         return {
           ...baseConfig,
           timeout: 5000, // Escrita pode demorar mais
           errorThresholdPercentage: 60, // Mais tolerante a erros
           resetTimeout: 30000, // Recuperação mais lenta
         };
       case "update":
         return {
           ...baseConfig,
           timeout: 4000, // Atualização moderada
           errorThresholdPercentage: 55, // Moderadamente tolerante
           resetTimeout: 25000, // Recuperação moderada
         };
       case "delete":
         return {
           ...baseConfig,
           timeout: 3000, // Deleção rápida
           errorThresholdPercentage: 50, // Moderadamente tolerante
           resetTimeout: 20000, // Recuperação moderada
         };
       default:
         return {
           ...baseConfig,
           timeout: 3000,
           errorThresholdPercentage: 50,
           resetTimeout: 30000,
         };
     }
  }

  private setupCircuitBreakerEvents(
    circuitBreaker: CircuitBreaker,
    name: string
  ): void {
    circuitBreaker.on("open", () => {
      this.logger.warn(`Circuit breaker ${name} is OPEN - Service unavailable`);
    });

    circuitBreaker.on("halfOpen", () => {
      this.logger.log(`Circuit breaker ${name} is HALF-OPEN - Testing service`);
    });

    circuitBreaker.on("close", () => {
      this.logger.log(`Circuit breaker ${name} is CLOSED - Service healthy`);
    });

    circuitBreaker.on("failure", (error) => {
      this.logger.error(`Circuit breaker ${name} failure:`, error.message);
    });

    circuitBreaker.on("success", () => {
      this.logger.debug(`Circuit breaker ${name} success`);
    });
  }

  getCircuitBreaker(name: string): CircuitBreaker | undefined {
    return this.circuitBreakers.get(name);
  }

  getAllCircuitBreakers(): Map<string, CircuitBreaker> {
    return this.circuitBreakers;
  }
}