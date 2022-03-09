import { Class } from "@prisma/client";
import { db } from "prisma/client";
import { HttpError } from "types/HttpError";

export class ClassRepository {
  async addTeacher(classId: string, teacherId: string) {
    const user = await db.teacher.findFirst({ where: { userId: teacherId } });

    if (!user) {
      throw new HttpError(404, "Teacher not found");
    }

    return await db.class.update({
      where: { id: classId },
      data: {
        teachers: { connect: { id: teacherId } },
      },
    });
  }

  async findAll() {
    return await db.class.findMany();
  }

  async findById(id: string) {
    return await db.class.findFirst({ where: { id } });
  }

  async create(entity: Class) {
    return await db.class.create({ data: entity });
  }

  async update(id: string, entity: Class) {
    return await db.class.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.class.delete({ where: { id } });
  }

  async studentsOf(id: any) {
    const data = await db.class.findFirst({
      where: { id },
      select: {
        students: {
          include: {
            user: { select: { email: true, role: true, name: true, id: true } },
          },
        },
      },
    });

    return data?.students;
  }
}
