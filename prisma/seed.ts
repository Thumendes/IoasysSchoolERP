import { Class, PrismaClient, Subject, User } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const adminsRepository = new Map<string, User>();
  const teachersRepository = new Map<string, User>();
  const studentsRepository = new Map<string, User>();
  const subjectsRepository = new Map<string, Subject>();
  const classesRepository = new Map<string, Class>();

  /**
   * ADMINS
   */
  const adminsData = [
    { name: "Arthur", email: "arthur@dinamica.com", password: "admin123" },
    { name: "Brenda", email: "brenda@admin.com", password: "admin123" },
  ];

  for (const admin of adminsData) {
    const user = await db.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        name: admin.name,
        password: admin.password,
        role: "ADMIN",
      },
    });

    adminsRepository.set(user.name, user);
  }

  /**
   * TEACHERS
   */
  const teachersData = [
    { name: "Luciane", email: "luciane@dinamica.com", password: "luciane" },
    { name: "Marcela", email: "marcela@dinamica.com", password: "marcela" },
    { name: "Pedro", email: "pedro@dinamica.com", password: "pedro" },
    { name: "Julia", email: "julia@dinamica.com", password: "julia" },
    { name: "Marcos", email: "marcos@dinamica.com", password: "marcos" },
    { name: "Fernando", email: "fernando@dinamica.com", password: "fernando" },
  ];

  for (const teacher of teachersData) {
    const user = await db.user.upsert({
      where: { email: teacher.email },
      update: {},
      create: {
        email: teacher.email,
        name: teacher.name,
        password: teacher.password,
        role: "TEACHER",
        teachers: { create: {} },
      },
    });

    teachersRepository.set(user.name, user);
  }

  /**
   * STUDENTS
   */
  const studentsData = [
    { name: "Miguel", email: "2022001@dinamica.com", password: "2022001" },
    { name: "Heitor", email: "2022002@dinamica.com", password: "2022002" },
    { name: "Helena", email: "2022003@dinamica.com", password: "2022003" },
    { name: "Theo", email: "2022004@dinamica.com", password: "2022004" },
    { name: "Laura", email: "2022005@dinamica.com", password: "2022005" },
    { name: "Ana Clara", email: "2022006@dinamica.com", password: "2022006" },
    { name: "Alice", email: "2022007@dinamica.com", password: "2022007" },
    { name: "Gael", email: "2022008@dinamica.com", password: "2022008" },
  ];

  for (const student of studentsData) {
    const user = await db.user.upsert({
      where: { email: student.email },
      update: {},
      create: {
        email: student.email,
        name: student.name,
        password: student.password,
        role: "STUDENT",
        students: { create: {} },
      },
    });

    studentsRepository.set(user.name, user);
  }

  /**
   * SUBJECTS
   */
  const subjectsData = ["Matemática", "Português", "História", "Geografia"];

  for (const subjectName of subjectsData) {
    const subjectEntity = await db.subject.upsert({
      where: { name: subjectName },
      update: {},
      create: { name: subjectName },
    });

    subjectsRepository.set(subjectEntity.name, subjectEntity);
  }

  /**
   * CLASSES
   */
  const classesData = ["4A", "5A"];

  for (const className of classesData) {
    const classEntity = await db.class.upsert({
      where: { name: className },
      update: {},
      create: { name: className },
    });

    classesRepository.set(classEntity.name, classEntity);
  }

  /**
   * CONNECTIONS
   */

  // CLASSES - SUBJECTS
  for (const classEntity of classesRepository.values()) {
    await db.class.update({
      where: { id: classEntity.id },
      data: {
        subjects: {
          connect: [...subjectsRepository.values()].map((s) => ({
            id: s.id,
          })),
        },
      },
    });
  }

  // STUDENTS - CLASSES
  const studentsClassesData = [
    {
      student: studentsRepository.get("Miguel"),
      class: classesRepository.get("4A"),
    },
    {
      student: studentsRepository.get("Heitor"),
      class: classesRepository.get("4A"),
    },
    {
      student: studentsRepository.get("Helena"),
      class: classesRepository.get("4A"),
    },
    {
      student: studentsRepository.get("Theo"),
      class: classesRepository.get("4A"),
    },
    {
      student: studentsRepository.get("Laura"),
      class: classesRepository.get("5A"),
    },
    {
      student: studentsRepository.get("Ana Clara"),
      class: classesRepository.get("5A"),
    },
    {
      student: studentsRepository.get("Alice"),
      class: classesRepository.get("5A"),
    },
    {
      student: studentsRepository.get("Gael"),
      class: classesRepository.get("5A"),
    },
  ];

  for (const studentClass of studentsClassesData) {
    await db.student.update({
      where: { userId: studentClass.student!.id },
      data: {
        classes: {
          connect: { id: studentClass.class!.id },
        },
      },
    });
  }

  // TEACHERS - SUBJECTS - CLASSES
  const teachersClassesData = [
    {
      teacher: teachersRepository.get("Luciane"),
      subject: subjectsRepository.get("Português"),
      classes: [classesRepository.get("4A")],
    },
    {
      teacher: teachersRepository.get("Marcela"),
      subject: subjectsRepository.get("Português"),
      classes: [classesRepository.get("5A")],
    },
    {
      teacher: teachersRepository.get("Pedro"),
      subject: subjectsRepository.get("Matemática"),
      classes: [classesRepository.get("4A")],
    },
    {
      teacher: teachersRepository.get("Julia"),
      subject: subjectsRepository.get("Matemática"),
      classes: [classesRepository.get("5A")],
    },
    {
      teacher: teachersRepository.get("Marcos"),
      subject: subjectsRepository.get("História"),
      classes: [classesRepository.get("4A"), classesRepository.get("5A")],
    },
    {
      teacher: teachersRepository.get("Fernando"),
      subject: subjectsRepository.get("Geografia"),
      classes: [classesRepository.get("4A"), classesRepository.get("5A")],
    },
  ];

  for (const teacherClass of teachersClassesData) {
    await db.teacher.update({
      where: { userId: teacherClass.teacher!.id },
      data: {
        classes: { connect: teacherClass.classes.map((c) => ({ id: c!.id })) },
        subjects: {
          connect: {
            id: teacherClass.subject!.id,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
