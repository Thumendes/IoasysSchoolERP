import { Class } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { ClassRepository } from "./class.repository";

interface AddTeacherParams {
  teacherId: string;
  classId: string;
}

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
  }: HttpPayload<any, AddTeacherParams>) {
    return await this.ClassRepository.addTeacher(classId, teacherId);
  }

  async classStudents({ params: { id } }: HttpPayload) {
    return await this.ClassRepository.studentsOf(id);
  }
}
