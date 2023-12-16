import os from 'node:os'
import { connections } from "../commons/connections.mjs";
import { subscriber } from "../commons/get-redis-service.mjs";
import { notifyConnections } from "../publisher/index.mjs";
  
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
      .then(() => console.log(`Success subscribe instance ${os.hostname()}`))
      .catch(err => console.error(err.message))
}
