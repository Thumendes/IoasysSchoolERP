import { TeacherRepository } from "../teacher.repository";

export function makeTeacherRepository() {
  return new TeacherRepository();
}
