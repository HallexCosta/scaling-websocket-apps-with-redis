const isDocker = process.env.DOCKER == 'true'
export const APPID = process.env.APPID ?? 'Default';
export const HTTP_PORT = 8080
export const REDIS_HOST = isDocker ? 'rds' : 'localhost'
export const REDIS_PORT = 6379
export const LIVE_CHAT_CHANNEL = 'livechat'


console.log({REDIS_HOST, REDIS_PORT})