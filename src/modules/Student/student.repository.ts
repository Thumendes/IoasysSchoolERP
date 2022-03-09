import { Student } from "@prisma/client";
import { ClassRepository } from "modules/Class/class.repository";
import { db } from "prisma/client";
import { HttpError } from "types/HttpError";

export class StudentRepository {
  constructor(private readonly classRepository: ClassRepository) {}

  async findAll() {
    return await db.student.findMany({
      include: {
        user: { select: { email: true, role: true, name: true, id: true } },
      },
    });
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

  async findStudentGrade(id: any) {
    // Get Student with his class
    const student = await db.student.findFirst({
      where: { id },
      include: { user: true, class: true },
    });

    if (!student || !student.class)
      throw new HttpError(404, "Student not found");

    // Get all subjects of the class
    const subjects = await this.classRepository.subjectsOf(student.class.id);

    if (!subjects) throw new HttpError(404, "Subjects not found");

    const data = [];

    for (const subject of subjects) {
      const exams = await db.exam.findMany({
        where: { subjectId: subject.id },
      });

      let totalGrade = 0;
      let examsGrade = [];

      for (const exam of exams) {
        const grade = await db.grade.findFirst({
          where: { examId: exam.id, studentId: id },
        });

        const value = grade?.grade || 0;

        examsGrade.push({ exam: exam.name, grade: value });
        totalGrade += value;
      }

      data.push({ subject: subject.name, examsGrade, totalGrade });
    }

    return data;
  }
}
