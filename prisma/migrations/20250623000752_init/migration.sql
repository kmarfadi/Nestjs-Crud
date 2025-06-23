-- CreateTable
CREATE TABLE "todoList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "todoList_pkey" PRIMARY KEY ("id")
);
