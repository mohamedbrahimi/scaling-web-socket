export const REDIS_HOST = process.env.REDIS_URL || '127.0.0.1';
export const REDIS_PORT = process.env.REDIS_PORT || '6379';
export const REDIS_QUEUE_NAMESPACE = process.env.REDIS_QUEUE_NAMESPACE || 'zumba_queue';