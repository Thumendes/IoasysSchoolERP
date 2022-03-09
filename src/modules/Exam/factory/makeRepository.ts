import { ExamRepository } from "../exam.repository";

export function makeExamRepository() {
  return new ExamRepository();
}
