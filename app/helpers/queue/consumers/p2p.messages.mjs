import redisSMQ  from 'redis-smq';

import {
  P2P_MESSAGES_WORKER_NAME_SPACE,
  P2P_MESSAGES_REDIS_TOPIC,
  P2P_MESSAGES_SOCKET_EVENT,
} from '../../../config/constants.mjs';
import queueConfig from '../config.mjs';


const Consumer = redisSMQ.Consumer;

class P2pMessagesConsumer extends redisSMQ.Consumer {
  constructor(io) {
    super(queueConfig);
    this.io = io;
  }

  consume(message, cb) {
    try {
      console.warn(`p2p message consumed message ${JSON.stringify(message)}`);
      const data = message;
      this.io.of(P2P_MESSAGES_WORKER_NAME_SPACE).to(data.driver).emit(P2P_MESSAGES_SOCKET_EVENT, data);
      cb();
    } catch (err) {
      console.warn("p2p-messages socket emit error")

      console.warn(`p2p messages consumer error : ${JSON.stringify(err)}`);
      cb(err);
    }
  }
}
P2pMessagesConsumer.queueName = P2P_MESSAGES_REDIS_TOPIC;

export { P2pMessagesConsumer };
