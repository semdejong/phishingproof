-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToQuizzes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToQuizzes_AB_unique" ON "_CategoriesToQuizzes"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToQuizzes_B_index" ON "_CategoriesToQuizzes"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToQuizzes" ADD CONSTRAINT "_CategoriesToQuizzes_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToQuizzes" ADD CONSTRAINT "_CategoriesToQuizzes_B_fkey" FOREIGN KEY ("B") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
