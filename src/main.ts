import "dotenv/config";
import { HttpServer } from "server/server";

export const server = new HttpServer(Number(process.env.PORT));

server.start();
