import { GradeController } from "../grade.controller";
import { makeGradeRepository } from "./makeRepository";

export function makeGradeController() {
  const GradeRepository = makeGradeRepository();
  return new GradeController(GradeRepository);
}
