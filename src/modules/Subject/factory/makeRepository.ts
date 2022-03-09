import { SubjectRepository } from "../subject.repository";

export function makeSubjectRepository() {
  return new SubjectRepository();
}
