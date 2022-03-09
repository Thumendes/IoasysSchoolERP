import { SubjectController } from "../subject.controller";
import { makeSubjectRepository } from "./makeRepository";

export function makeSubjectController() {
  const SubjectRepository = makeSubjectRepository();
  return new SubjectController(SubjectRepository);
}
