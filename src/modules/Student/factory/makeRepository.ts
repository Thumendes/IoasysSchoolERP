import { makeClassRepository } from "modules/Class/factory/makeRepository";
import { StudentRepository } from "../student.repository";

export function makeStudentRepository() {
  const classRepository = makeClassRepository();
  return new StudentRepository(classRepository);
}
