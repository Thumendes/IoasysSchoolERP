import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, url } = req;

  res.on("finish", () => {
    const { statusCode, statusMessage } = res;
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const color =
      statusCode >= 500
        ? "red"
        : statusCode >= 400
        ? "yellow"
        : statusCode >= 300
        ? "cyan"
        : statusCode >= 200
        ? "green"
        : "gray";

    console.log(
      chalk`{gray ${time}} {blue.bold ${method}} {gray ${url}} {${color}.bold ${statusCode}} {gray ${statusMessage}}`
    );
  });

  next();
}
