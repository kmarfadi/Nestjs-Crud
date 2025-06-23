/*
  Warnings:

  - You are about to drop the `todoList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "todoList";

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);
