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
      // console.log(message.getBody())
      console.warn(`p2p message consumed message ${JSON.stringify(message)}`);
      console.log(message);
      console.log(message.to);

       const data = message;
      // console.log(...data)
      // console.log(data)
      // console.log(data['id'], data.id, message.id)
      this.io.of(P2P_MESSAGES_WORKER_NAME_SPACE).to(data.to).emit(P2P_MESSAGES_SOCKET_EVENT, data);
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
