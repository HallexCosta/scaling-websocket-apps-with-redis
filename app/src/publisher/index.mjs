import { APPID } from "../commons/config.mjs";
import { publisher } from "../commons/get-redis-service.mjs";

export function sendMessageToQueue({
  channel, 
  message
}) {
  publisher.publish(channel, message)
}

export async function notifyConnections({
  connections,
  message
}) {
  connections.forEach(connection => connection.send(`${APPID}: ${message}`))
  console.log('All sockets notified')
  return true
}