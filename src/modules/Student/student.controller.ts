import { Student } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { StudentRepository } from "./student.repository";

export class StudentController {
  constructor(private readonly StudentRepository: StudentRepository) {}

  async findStudentGrade({ params: { id } }: HttpPayload) {
    return await this.StudentRepository.findStudentGrade(id);
  }

  async findAll({}: HttpPayload) {
    return await this.StudentRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.StudentRepository.findById(id);
  }

  async create({ data }: HttpPayload<Student>) {
    return await this.StudentRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<Student>) {
    return await this.StudentRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.StudentRepository.delete(id);
  }
}
