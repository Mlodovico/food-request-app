"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CircuitBreakerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreakerService = void 0;
const common_1 = require("@nestjs/common");
const CircuitBreaker = require("opossum");
let CircuitBreakerService = CircuitBreakerService_1 = class CircuitBreakerService {
    constructor() {
        this.logger = new common_1.Logger(CircuitBreakerService_1.name);
        this.circuitBreakers = new Map();
    }
    createCircuitBreaker(name, operation, operationType) {
        const config = this.getConfigByOperationType(operationType);
        const circuitBreaker = new CircuitBreaker(operation, config);
        this.setupCircuitBreakerEvents(circuitBreaker, name);
        this.circuitBreakers.set(name, circuitBreaker);
        return circuitBreaker;
    }
    getConfigByOperationType(type) {
        const baseConfig = {
            rollingCountTimeout: 10000,
            rollingCountBuckets: 10,
        };
        switch (type) {
            case "read":
                return {
                    ...baseConfig,
                    timeout: 2000,
                    errorThresholdPercentage: 40,
                    resetTimeout: 15000,
                };
            case "write":
                return {
                    ...baseConfig,
                    timeout: 5000,
                    errorThresholdPercentage: 60,
                    resetTimeout: 30000,
                };
            case "update":
                return {
                    ...baseConfig,
                    timeout: 4000,
                    errorThresholdPercentage: 55,
                    resetTimeout: 25000,
                };
            case "delete":
                return {
                    ...baseConfig,
                    timeout: 3000,
                    errorThresholdPercentage: 50,
                    resetTimeout: 20000,
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
    setupCircuitBreakerEvents(circuitBreaker, name) {
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
    getCircuitBreaker(name) {
        return this.circuitBreakers.get(name);
    }
    getAllCircuitBreakers() {
        return this.circuitBreakers;
    }
};
exports.CircuitBreakerService = CircuitBreakerService;
exports.CircuitBreakerService = CircuitBreakerService = CircuitBreakerService_1 = __decorate([
    (0, common_1.Injectable)()
], CircuitBreakerService);
//# sourceMappingURL=circuit-breaker.service.js.map