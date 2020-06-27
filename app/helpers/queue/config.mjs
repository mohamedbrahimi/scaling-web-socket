import { REDIS_HOST, REDIS_PORT, REDIS_QUEUE_NAMESPACE } from '../../config/redis.mjs';

export default {
  namespace: REDIS_QUEUE_NAMESPACE,
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    connect_timeout: 3600000,
  },
  log: {
    enabled: 0,
    options: {
      level: 'trace',
      /*
            streams: [
                {
                    path: path.normalize(`${__dirname}/../logs/redis-smq.log`)
                },
            ],
            */
    },
  },
  monitor: {
    enabled: false,
    host: '127.0.0.1',
    port: 3000,
  },
};
