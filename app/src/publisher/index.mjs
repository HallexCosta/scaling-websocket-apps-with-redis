import { publisher } from "../commons/get-redis-service.mjs";
import os from 'node:os'

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
  connections.forEach(connection => connection.send(`${os.hostname()}: ${message}`))
  console.log('All sockets notified')
  return true
}