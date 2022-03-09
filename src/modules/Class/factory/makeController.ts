import { ClassController } from "../class.controller";
import { makeClassRepository } from "./makeRepository";

export function makeClassController() {
  const ClassRepository = makeClassRepository();
  return new ClassController(ClassRepository);
}
