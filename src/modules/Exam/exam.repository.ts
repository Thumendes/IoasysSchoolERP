import { Exam } from "@prisma/client";
import { db } from "prisma/client";

export class ExamRepository {
  async findAll() {
    return await db.exam.findMany();
  }

  async findById(id: string) {
    return await db.exam.findFirst({ where: { id } });
  }

  async create(entity: Exam) {
    return await db.exam.create({ data: entity });
  }

  async update(id: string, entity: Exam) {
    return await db.exam.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.exam.delete({ where: { id } });
  }
}
