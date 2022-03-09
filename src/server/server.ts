import express, { json, Application } from "express";
import { createMiddlewares } from "./setup/createMiddlewares";
import { createRouters } from "./setup/createRouters";
import cors from "cors";
import helmet from "helmet";

import chalk from "chalk";

export class HttpServer {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  private async prepare() {
    this.app.use(json());
    this.app.use(helmet());
    this.app.use(cors());

    await createMiddlewares(this.app);
    await createRouters(this.app);
  }

  public async start() {
    console.log(chalk`🌎 Starting Server {gray ...}
`);

    await this.prepare();

    return this.app.listen(this.port, () => {
      console.log(chalk`
Server is listening on port {bold.blue ${this.port}}
{gray http://localhost:${this.port}}
`);
    });
  }
}
