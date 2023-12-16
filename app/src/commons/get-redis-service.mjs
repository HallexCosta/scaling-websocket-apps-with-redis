import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PORT } from './config.mjs'

export function getRedisService() {
    return new Redis(REDIS_PORT, REDIS_HOST)
}

export const publisher = getRedisService()
export const subscriber = getRedisService()