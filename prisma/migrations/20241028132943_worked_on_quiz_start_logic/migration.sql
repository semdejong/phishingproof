-- CreateTable
CREATE TABLE "quiz_instances" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT -1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_instances" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "quizInstanceId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_instances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz_instances" ADD CONSTRAINT "quiz_instances_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_instances" ADD CONSTRAINT "quiz_instances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_instances" ADD CONSTRAINT "question_instances_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_instances" ADD CONSTRAINT "question_instances_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_instances" ADD CONSTRAINT "question_instances_quizInstanceId_fkey" FOREIGN KEY ("quizInstanceId") REFERENCES "quiz_instances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
