# Instructions to Start the Application

This guide will provide instructions on how to start the application, which consists of a WebSocket service (ws) with four replicas and a load balancer (lb) using HAProxy. Additionally, a Redis database service (rds) is included to support pub/sub functionality.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine. If you don't have them, you can install them by following the instructions in the [Docker Installation Guide](https://docs.docker.com/get-docker/).

## Configuration

1. Clone the application repository.

   ```bash
   git clone https://github.com/HallexCosta/scaling-websocket-apps-with-redis.git
   cd scaling-websocket-apps-with-redis
   ```

## Starting the Application

1. Open a terminal and navigate to the application directory.

2. Run the following command to start the services:

   ```bash
   docker compose up -d
   ```

   This will start the services in the background. Wait until all services are running.

3. Check if the containers are running using the following command:

   ```bash
   docker compose ps
   ```

   This should display the status of the `lb`, `ws`, and `rds` containers.

## Accessing the Application

The application is now running and can be accessed through the HAProxy load balancer at [ws://localhost:8080](ws://localhost:8080).

To test socket communication, you can open two tabs in your browser and execute the following code:
```js
ws = new WebSocket('ws://localhost:8080')
ws.onmessage = console.log
ws.send('Sending message from <NAME_FROM_CONNECTED_INSTANCE>')
```

## Stopping the Application

To stop the application, run the following command:

```bash
docker compose down
```

This will stop all containers related to the application.

Now you can interact with your WebSocket application, which is load-balanced through HAProxy, and use the Redis service for pub/sub as needed.