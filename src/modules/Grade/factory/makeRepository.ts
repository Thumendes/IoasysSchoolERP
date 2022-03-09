import { GradeRepository } from "../grade.repository";

export function makeGradeRepository() {
  return new GradeRepository();
}
