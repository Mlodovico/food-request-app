import { ThrottlerConfig } from '@nestjs/throttler';

export const throttlerConfig = ThrottlerConfig.forRoot([
    {
        name: 'short',
        ttl: 1000,
        limit: 10,
    },
    {
        name: 'medium',
        ttl: 1000,
        limit: 30,
    },
    {
        name: 'long',
        ttl: 100000,
        limit: 60,
    }
])