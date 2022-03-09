import { Exam } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { ExamRepository } from "./exam.repository";

export class ExamController {
  constructor(private readonly ExamRepository: ExamRepository) {}

  async findAll({}: HttpPayload) {
    return await this.ExamRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.ExamRepository.findById(id);
  }

  async create({ data }: HttpPayload<Exam>) {
    return await this.ExamRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<Exam>) {
    return await this.ExamRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.ExamRepository.delete(id);
  }
}
