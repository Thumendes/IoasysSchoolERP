import { Teacher } from "@prisma/client";
import { db } from "prisma/client";

export class TeacherRepository {
  async findAll() {
    return await db.teacher.findMany({
      include: {
        user: { select: { email: true, role: true, name: true, id: true } },
      },
    });
  }

  async findById(id: string) {
    return await db.teacher.findFirst({ where: { id } });
  }

  async create(entity: Teacher) {
    return await db.teacher.create({ data: entity });
  }

  async update(id: string, entity: Teacher) {
    return await db.teacher.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.teacher.delete({ where: { id } });
  }

  async subjectsOf(id: string) {
    return await db.teacher.findFirst({
      where: { id },
      include: {
        user: { select: { email: true, role: true, name: true, id: true } },
        subjects: { select: { name: true, id: true } },
      },
    });
  }
}
