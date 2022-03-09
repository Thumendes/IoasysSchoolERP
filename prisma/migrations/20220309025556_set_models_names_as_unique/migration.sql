/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Class_name_key` ON `Class`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Exam_name_key` ON `Exam`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Subject_name_key` ON `Subject`(`name`);
