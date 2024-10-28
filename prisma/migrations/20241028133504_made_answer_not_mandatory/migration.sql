-- DropForeignKey
ALTER TABLE "question_instances" DROP CONSTRAINT "question_instances_answerId_fkey";

-- AlterTable
ALTER TABLE "question_instances" ALTER COLUMN "answerId" DROP NOT NULL,
ALTER COLUMN "answerId" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "question_instances" ADD CONSTRAINT "question_instances_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
