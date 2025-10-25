"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestId = void 0;
class RequestId {
    constructor(value) {
        this.value = value;
        if (!value || value.trim().length === 0) {
            throw new Error('RequestId cannot be empty');
        }
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
exports.RequestId = RequestId;
//# sourceMappingURL=request-id.js.map