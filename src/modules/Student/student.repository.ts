import { Student } from "@prisma/client";
import { db } from "prisma/client";

export class StudentRepository {
  async findAll() {
    return await db.student.findMany();
  }

  async findById(id: string) {
    return await db.student.findFirst({ where: { id } });
  }

  async create(entity: Student) {
    return await db.student.create({ data: entity });
  }

  async update(id: string, entity: Student) {
    return await db.student.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.student.delete({ where: { id } });
  }
}
