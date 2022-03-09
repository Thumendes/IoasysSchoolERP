import { StudentRepository } from "../student.repository";

export function makeStudentRepository() {
  return new StudentRepository();
}
