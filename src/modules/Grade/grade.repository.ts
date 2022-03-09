import { Grade } from "@prisma/client";
import { db } from "prisma/client";

export class GradeRepository {
  async findAll() {
    return await db.grade.findMany();
  }

  async findById(id: string) {
    return await db.grade.findFirst({ where: { id } });
  }

  async create(entity: Grade) {
    return await db.grade.create({ data: entity });
  }

  async update(id: string, entity: Grade) {
    return await db.grade.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.grade.delete({ where: { id } });
  }
}
