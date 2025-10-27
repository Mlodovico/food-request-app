"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CircuitBreakerInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreakerInterceptor = void 0;
const circuit_breaker_interceptor_1 = require("../decorator/circuit-breaker.interceptor");
const circuit_breaker_service_1 = require("../service/circuit-breaker.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
let CircuitBreakerInterceptor = CircuitBreakerInterceptor_1 = class CircuitBreakerInterceptor {
    constructor(circuitBreakerService, reflector) {
        this.circuitBreakerService = circuitBreakerService;
        this.reflector = reflector;
        this.logger = new common_1.Logger(CircuitBreakerInterceptor_1.name);
    }
    intercept(context, next) {
        const circuitBreakerConfig = this.reflector.getAllAndOverride(circuit_breaker_interceptor_1.CIRCUIT_BREAKER_KEY, [context.getHandler(), context.getClass()]);
        if (!circuitBreakerConfig) {
            return next.handle();
        }
        const { operationType } = circuitBreakerConfig;
        const methodName = context.getHandler().name;
        const className = context.getClass().name;
        const circuitBreakerName = `${className}.${methodName}`;
        let circuitBreaker = this.circuitBreakerService.getCircuitBreaker(circuitBreakerName);
        if (!circuitBreaker) {
            circuitBreaker = this.circuitBreakerService.createCircuitBreaker(circuitBreakerName, () => next.handle().toPromise(), operationType);
        }
        return new rxjs_1.Observable((observer) => {
            circuitBreaker
                .fire()
                .then((result) => {
                observer.next(result);
                observer.complete();
            })
                .catch((error) => {
                observer.error(error);
            });
        }).pipe((0, rxjs_1.catchError)((error) => {
            if (error.code === "ECIRCUITOPEN") {
                this.logger.warn(`Circuit breaker ${circuitBreakerName} is open - Service unavailable`);
                return (0, rxjs_1.throwError)(() => new Error("Service temporarily unavailable. Please try again later"));
            }
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.CircuitBreakerInterceptor = CircuitBreakerInterceptor;
exports.CircuitBreakerInterceptor = CircuitBreakerInterceptor = CircuitBreakerInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [circuit_breaker_service_1.CircuitBreakerService,
        core_1.Reflector])
], CircuitBreakerInterceptor);
//# sourceMappingURL=circuit-breaker.interceptor.js.map