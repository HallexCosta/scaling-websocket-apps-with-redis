# Instruções para Iniciar a Aplicação

Este guia fornecerá instruções sobre como iniciar a aplicação, que consiste em um serviço WebSocket (ws) com quatro réplicas e um balanceador de carga (lb) utilizando o HAProxy. Além disso, um serviço de banco de dados Redis (rds) é incluído para suportar a funcionalidade de pub/sub.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Caso não tenha, você pode instalá-los seguindo as instruções em [Docker Installation Guide](https://docs.docker.com/get-docker/).

## Configuração

1. Clone o repositório da aplicação.

   ```bash
   git clone https://github.com/HallexCosta/scaling-websocket-apps-with-redis.git
   cd scaling-websocket-apps-with-redis
   ```

## Iniciando a Aplicação

1. Abra um terminal e navegue até o diretório da aplicação.

2. Execute o seguinte comando para iniciar os serviços:

   ```bash
   docker compose up -d
   ```

   Isso iniciará os serviços em segundo plano. Aguarde até que todos os serviços estejam em execução.

3. Verifique se os containers estão em execução usando o seguinte comando:

   ```bash
   docker compose ps
   ```

   Isso deve mostrar o status dos containers `lb`, `ws`, e `rds`.

## Acessando a Aplicação

A aplicação agora está em execução e pode ser acessada através do balanceador de carga HAProxy em [ws://localhost:8080](ws://localhost:8080).  

Para testar a comunição entre sockets, você pode abrir duas abas do seu navegador e executar o codigo abaixo:
```js
ws = new WebSocket('ws://localhost:8080')
ws.onmessage = console.log
ws.send('Sending message from <NAME_FROM_INSTANCE_CONNECTED>')
```

## Encerrando a Aplicação

Para encerrar a aplicação, execute o seguinte comando:

```bash
docker compose down
```

Isso encerrará todos os containers relacionados à aplicação.

Agora você pode começar a interagir com sua aplicação WebSocket, que está balanceada por meio do HAProxy, e utilizar o serviço Redis para pub/sub conforme necessário.