import { Grade } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { GradeRepository } from "./grade.repository";

export class GradeController {
  constructor(private readonly GradeRepository: GradeRepository) {}

  async findAll({}: HttpPayload) {
    return await this.GradeRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.GradeRepository.findById(id);
  }

  async create({ data }: HttpPayload<Grade>) {
    return await this.GradeRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<Grade>) {
    return await this.GradeRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.GradeRepository.delete(id);
  }
}
