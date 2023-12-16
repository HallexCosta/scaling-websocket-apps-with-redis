
import {server as WebSocketServer} from "websocket"
import { httpServer } from "../http/index.mjs";
import { sendMessageToQueue } from "../publisher/index.mjs";
import { APPID } from "../commons/config.mjs";
import { connections } from "../commons/connections.mjs";

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res   
export function startWebSockerServer() {
    return new WebSocketServer({
        httpServer
    })
}

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it! 
export function listenWebSocketRequests(websocket, channel) {
    websocket.on("request", request => {
        const connection = request.accept(null, request.origin)
        
        connection.on("message", message => {
            message = message.utf8Data
            //publish the message to redis
            console.log(`"${APPID}" Received message: ${message}`)
            sendMessageToQueue({
                message,
                channel
            })
        })

        connections.push(connection)
        connection.send(`Connected successfully to server "${APPID}"`)
    })
}