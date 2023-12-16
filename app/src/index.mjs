import { LIVE_CHAT_CHANNEL } from "./commons/config.mjs";
import { startHttpServer } from "./http/index.mjs";
import { listenReceiveMessages, startListenChannel } from "./subscriber/index.mjs";
import { listenWebSocketRequests, startWebSockerServer } from "./socket/index.mjs";
 
async function main() {
  listenReceiveMessages()
  startListenChannel(LIVE_CHAT_CHANNEL)
  listenWebSocketRequests(startWebSockerServer(), LIVE_CHAT_CHANNEL)
  startHttpServer()
}

main()