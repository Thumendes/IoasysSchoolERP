import express, { json, Application } from "express";
import { createMiddlewares } from "./setup/createMiddlewares";
import { createRouters } from "./setup/createRouters";
import cors from "cors";
import helmet from "helmet";
import { Server } from "http";

import chalk from "chalk";
import { Utils } from "services/utils";

export class HttpServer {
  static app = express();
  static available = false;
  static prepared = false;
  public port: number;
  public server!: Server;

  constructor(port: number = Number(process.env.PORT)) {
    this.port = port;
  }

  public checkStatus() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (HttpServer.available) resolve(true);
      }, 500);
    });
  }

  static async prepare() {
    if (HttpServer.prepared) return;

    HttpServer.app.use(json());
    HttpServer.app.use(helmet());
    HttpServer.app.use(cors());

    await createMiddlewares(HttpServer.app);
    await createRouters(HttpServer.app);

    HttpServer.prepared = true;
  }

  public async stop() {
    console.clear();
    console.log(chalk`🌎 Stopping Server {gray ...}`);

    this.server.close();
  }

  public start() {
    return new Promise(async (resolve) => {
      await Utils.sleep(500);

      console.clear();
      console.log(chalk`🌎 Starting Server {gray ...}
`);

      await HttpServer.prepare();

      this.server = HttpServer.app.listen(this.port, () => {
        console.log(chalk`
Server is listening on port {bold.blue ${this.port}}
{gray http://localhost:${this.port}}
`);
        HttpServer.available = true;

        resolve(true);
      });
    });
  }
}
