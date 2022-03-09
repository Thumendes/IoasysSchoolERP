import { Subject } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { SubjectRepository } from "./subject.repository";

export class SubjectController {
  constructor(private readonly SubjectRepository: SubjectRepository) {}

  async findAll({}: HttpPayload) {
    return await this.SubjectRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.SubjectRepository.findById(id);
  }

  async create({ data }: HttpPayload<Subject>) {
    return await this.SubjectRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<Subject>) {
    return await this.SubjectRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.SubjectRepository.delete(id);
  }

  async subjectTeachers({ params: { id } }: HttpPayload) {
    return await this.SubjectRepository.teachersOf(id);
  }
}
