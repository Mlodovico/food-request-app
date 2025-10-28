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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const circuit_breaker_service_1 = require("../../infrastructure/service/circuit-breaker.service");
const common_1 = require("@nestjs/common");
let HealthController = class HealthController {
    constructor(circuitBreakerService) {
        this.circuitBreakerService = circuitBreakerService;
    }
    getCircuitBreakerStatus() {
        const circuitBreakers = this.circuitBreakerService.getAllCircuitBreakers();
        const status = {};
        const circuitBreakerMap = circuitBreakers;
        circuitBreakerMap.forEach((cb, name) => {
            status[name] = {
                state: cb.status,
                stats: cb.stats,
                options: cb._options,
            };
        });
        return status;
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)("circuit-breaker"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getCircuitBreakerStatus", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)("health"),
    __metadata("design:paramtypes", [circuit_breaker_service_1.CircuitBreakerService])
], HealthController);
//# sourceMappingURL=health.controller.js.map