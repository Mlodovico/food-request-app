import { SetMetadata } from "@nestjs/common";

export const CIRCUIT_BREAKER_KEY = "circuitBreaker";

export const CircuitBreaker = (
  operationType?: "read" | "write" | "delete" | "update"
) => SetMetadata(CIRCUIT_BREAKER_KEY, { operationType });
