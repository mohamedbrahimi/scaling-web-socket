import redisSMQ from 'redis-smq';
import {
   P2P_MESSAGES_REDIS_TOPIC,
   STORE_P2P_MESSAGES_REDIS_TOPIC,
} from '../../../config/constants.mjs';
import config from '../config.mjs';

const Producer = redisSMQ.Producer;
const Message = redisSMQ.Message;

const producerP2pMessages = new Producer(P2P_MESSAGES_REDIS_TOPIC, config);

export function produceP2pMessage(message) {
    try {
        const encodedMessage = message;
        const messageObj = new Message();
        messageObj.setBody(encodedMessage);
        console.debug(`producing p2p messages : ${JSON.stringify(encodedMessage)}`);
        producerP2pMessages.produceMessage(messageObj, (err) => {
            if (err) { console.warn(err); return false; }
            return true;
        });
        return true;
    } catch (e) {
        return false;
    }
}
