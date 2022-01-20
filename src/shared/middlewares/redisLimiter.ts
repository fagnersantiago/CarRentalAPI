import { NextFunction, Request, Response } from 'express';
import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppErros } from '../errors/AppErrors';

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

//cria limitação de requisição por segundos
const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'redisClient',
    points: 15,
    duration: 5,
});

//função para cosumir o limiter
export default async function raterLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await limiter.consume(request.ip);

        next();
    } catch (err) {
        throw new AppErros('To many request!');
    }
}
