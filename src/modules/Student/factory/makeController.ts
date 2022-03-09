import { StudentController } from "../student.controller";
import { makeStudentRepository } from "./makeRepository";

export function makeStudentController() {
  const StudentRepository = makeStudentRepository();
  return new StudentController(StudentRepository);
}
