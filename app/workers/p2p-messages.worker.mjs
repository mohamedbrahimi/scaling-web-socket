import socketIo from 'socket.io-emitter';
import { REDIS_HOST, REDIS_PORT } from "../config/redis.mjs";
import { P2pMessagesConsumer } from '../helpers/queue/consumers/p2p.messages.mjs';
const io = socketIo({ host: REDIS_HOST, port: REDIS_PORT });


console.warn('started WorkerP2pMessages worker');
const WorkerP2pMessages = new P2pMessagesConsumer(io);
WorkerP2pMessages.run();
process.on('SIGINT', () => {
  console.warn('stopping WorkerP2pMessages worker...');
  WorkerP2pMessages.shutdown();
  console.warn('stopped WorkerP2pMessages worker');
  process.exit(0);
});
