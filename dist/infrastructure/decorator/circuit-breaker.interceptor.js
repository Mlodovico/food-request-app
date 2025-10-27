"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = exports.CIRCUIT_BREAKER_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.CIRCUIT_BREAKER_KEY = "circuitBreaker";
const CircuitBreaker = (operationType) => (0, common_1.SetMetadata)(exports.CIRCUIT_BREAKER_KEY, { operationType });
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuit-breaker.interceptor.js.map