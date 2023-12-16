import http from "http";
import ws from "websocket"
import redis from "redis";
import Redis from "ioredis";
const APPID = process.env.APPID ?? 'Default';
const WebSocketServer = ws.server

let websocketConnections = [];

const subscriber = new Redis(6379, 'rds')
const publisher = new Redis(6379, 'rds')
 
subscriber.on("subscribe", function(channel, count) {
  console.log(`Server ${APPID} subscribed successfully to livechat`)
  publisher.publish("livechat", "a message");
});
 
subscriber.on("message", function(channel, message) {
  try{
    //when we receive a message I want t
    console.log(`Server ${APPID} received message in channel ${channel} msg: ${message}`);
    websocketConnections.forEach(connection => connection.send(`${APPID}: ${message}`))
  } catch(err){
    console.log("ERR::" + err.message)
  }
});


subscriber.subscribe("livechat");

//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer()

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res 
const websocket = new WebSocketServer({
    "httpServer": httpserver
})


httpserver.listen(8080, () => console.log("My server is listening on port 8080"))

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it! 
websocket.on("request", request=> {
    const connection = request.accept(null, request.origin)
    
    connection.on('connection', () => console.log('Connected'))
    connection.on("open", () => console.log("opened"))
    connection.on("close", () => console.log("CLOSED!!!"))
    connection.on("message", message => {
        //publish the message to redis
        console.log(`"${APPID}" Received message: ${message.utf8Data}`)
        publisher.publish("livechat", message.utf8Data)
    })

    setTimeout(() => connection.send(`Connected successfully to server ${APPID}`), 5000)
    websocketConnections.push(connection)
})

// websocket.on('connect', () => {
// })
  
//client code 
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")


/*
    //code clean up after closing connection
    subscriber.unsubscribe();
    subscriber.quit();
    publisher.quit();
    */