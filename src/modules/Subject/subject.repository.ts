import { Subject } from "@prisma/client";
import { db } from "prisma/client";

export class SubjectRepository {
  async findAll() {
    return await db.subject.findMany();
  }

  async findById(id: string) {
    return await db.subject.findFirst({ where: { id } });
  }

  async create(entity: Subject) {
    return await db.subject.create({ data: entity });
  }

  async update(id: string, entity: Subject) {
    return await db.subject.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.subject.delete({ where: { id } });
  }

  async teachersOf(id: string) {
    const data = await db.subject.findFirst({
      where: { id },
      select: {
        teachers: {
          include: {
            user: { select: { email: true, role: true, name: true, id: true } },
          },
        },
      },
    });

    return data?.teachers;
  }
}
