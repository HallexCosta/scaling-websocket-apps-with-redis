import { connections } from "../commons/connections.mjs";
import { subscriber } from "../commons/get-redis-service.mjs";
import { notifyConnections } from "../publisher/index.mjs";
import { APPID } from '../commons/config.mjs';
  
export function listenReceiveMessages() {
  subscriber.on('message', async function(_channel, message) {
    await notifyConnections({
      connections,
      message
    })
  });
}

export function startListenChannel(channel) {
  subscriber.subscribe(channel)
      .then(() => console.log(`Success subscribe instance ${APPID}`))
      .catch(err => console.error(err.message))
}
