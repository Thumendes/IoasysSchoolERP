import { TeacherController } from "../teacher.controller";
import { makeTeacherRepository } from "./makeRepository";

export function makeTeacherController() {
  const TeacherRepository = makeTeacherRepository();
  return new TeacherController(TeacherRepository);
}
