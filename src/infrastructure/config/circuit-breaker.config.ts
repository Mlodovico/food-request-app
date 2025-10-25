export interface CircuitBreakerConfig {
    timeout: number;
    errorThresholdPercentage: number;
    resetTimeout: number;
    rollingCountTimeout: number;
    rollingCountBuckets: number;
}

export const circuitBreakerConfig: Record<string, CircuitBreakerConfig> = {
    'create-food-request': {
        timeout: 1000,
        errorThresholdPercentage: 60,
        resetTimeout: 30000,
        rollingCountTimeout: 10000,
        rollingCountBuckets: 10,
    },
    'get-food-request': {
        timeout: 3000,
        errorThresholdPercentage: 50,
        resetTimeout: 20000,
        rollingCountTimeout: 10000,
        rollingCountBuckets: 10,
    },
    'approve-food-request': {
        timeout: 4000,
        errorThresholdPercentage: 50,
        resetTimeout: 15000,
        rollingCountTimeout: 10000,
        rollingCountBuckets: 10,
    },
    'default': {
        timeout: 3000,
        errorThresholdPercentage: 50,
        resetTimeout: 20000,
        rollingCountTimeout: 10000,
        rollingCountBuckets: 10,
    }
}