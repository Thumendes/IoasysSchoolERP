import chalk from "chalk";
import { Application, Router } from "express";
import { getAllFiles } from "services/getAllFiles";

export async function createRouters(app: Application) {
  const files = await getAllFiles("router");

  for (const file of files) {
    const name = file.split("/").pop();
    console.log(chalk`[{blue router}]: {gray.bold ${name}}`);
    (await import(file)).default(app, Router());
  }
}
