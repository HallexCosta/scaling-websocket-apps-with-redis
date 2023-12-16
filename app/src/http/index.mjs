import http from "http";
import { HTTP_PORT } from "../commons/config.mjs";

export const httpServer = http.createServer()

export function startHttpServer() {
    httpServer.listen(HTTP_PORT, () => console.log(`My server is listening on port ${HTTP_PORT}`))
}