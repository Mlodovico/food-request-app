import { ThrottlerConfig } from '@nestjs/throttler';

export const throttlerConfig = ThrottlerConfig.forRoot([
    {
        name: 'short',
        ttl: 1000,
        limit: 10,
    },
    {
        name: 'medium',
        ttl: 10000,
        limit: 100,
    },
    {
        name: 'long',
        ttl: 100000,
        limit: 1000,
    }
])