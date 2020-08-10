import { P2P_MESSAGES_WORKER_NAME_SPACE } from "../config/constants.mjs";
import { produceP2pMessage, produceP2pMessageForStorage } from "../helpers/queue/producers/index.mjs";
const nameSpacesHandler = (io) => {

    const usersP2pMessages = io.of(P2P_MESSAGES_WORKER_NAME_SPACE);

    usersP2pMessages.on('connection', (socket) => {
      console.log(`${P2P_MESSAGES_WORKER_NAME_SPACE}!`);
      socket.on('room.join', (room) => {
          socket.join(room);
          console.log(`user join into: ${room}`);

          socket.on(`p2p-message-id-${room}`, (message) => {
              console.log(`message users/p2p/messages/ room/message: ${message}`);
              produceP2pMessage(message);
              produceP2pMessageForStorage(message);
          });
      });
      socket.on('room.leave', (room) => { socket.leave(room, ()=>{}); console.log(`user leave from: ${room}`);});
      socket.on('disconnect', (room) => {console.log(`user disconnected from: ${room}`);});
    });

  };

export { nameSpacesHandler };

