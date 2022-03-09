import { Class } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { ClassRepository } from "./class.repository";

type TecherParams = { teacherId: string; classId: string };
type StudentParams = { studentId: string; classId: string };

type AddUserParams<T extends "teacherId" | "studentId"> = Record<
  T extends "teacherId" ? keyof TecherParams : keyof StudentParams,
  string
>;

export class ClassController {
  constructor(private readonly ClassRepository: ClassRepository) {}

  async findAll({ user }: HttpPayload) {
    return await this.ClassRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.ClassRepository.findById(id);
  }

  async create({ data }: HttpPayload<Class>) {
    return await this.ClassRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<Class>) {
    return await this.ClassRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.ClassRepository.delete(id);
  }

  async addTeacher({
    params: { teacherId, classId },
  }: HttpPayload<any, AddUserParams<"teacherId">>) {
    return await this.ClassRepository.addTeacher(classId, teacherId);
  }

  async addStudent({
    params: { studentId, classId },
  }: HttpPayload<any, AddUserParams<"studentId">>) {
    return await this.ClassRepository.addStudent(classId, studentId);
  }

  async classStudents({ params: { id } }: HttpPayload) {
    return await this.ClassRepository.studentsOf(id);
  }
}
