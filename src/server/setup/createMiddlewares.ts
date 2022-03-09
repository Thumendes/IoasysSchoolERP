import chalk from "chalk";
import { Application } from "express";
import { getAllFiles } from "services/getAllFiles";

export async function createMiddlewares(app: Application) {
  const files = await getAllFiles("middleware");

  for (const file of files) {
    const name = file.split("/").pop();
    console.log(chalk`[{blue middleware}]: {gray.bold ${name}}`);
    app.use((await import(file)).default);
  }
}
