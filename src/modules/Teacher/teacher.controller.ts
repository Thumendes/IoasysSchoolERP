import { Teacher } from "@prisma/client";
import { HttpPayload } from "types/HttpPayload";
import { TeacherRepository } from "./teacher.repository";

export class TeacherController {
  constructor(private readonly TeacherRepository: TeacherRepository) {}

  async findAll({}: HttpPayload) {
    return await this.TeacherRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.TeacherRepository.findById(id);
  }

  async create({ data }: HttpPayload<Teacher>) {
    return await this.TeacherRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<Teacher>) {
    return await this.TeacherRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.TeacherRepository.delete(id);
  }
}
