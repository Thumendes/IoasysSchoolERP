import { ExamController } from "../exam.controller";
import { makeExamRepository } from "./makeRepository";

export function makeExamController() {
  const ExamRepository = makeExamRepository();
  return new ExamController(ExamRepository);
}
