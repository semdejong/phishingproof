import { Quizzes } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { EditQuizModal } from "@/components/edit-quiz-modal"
import { PostOperations } from "@/components/post-operations"

interface QuizItemProps {
  quiz: Quizzes
}

export function QuizItem({ quiz }: QuizItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="font-semibold hover:underline">
          <EditQuizModal quiz={quiz} allCategories={quiz.categories}/>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            {formatDate(quiz.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: quiz.id, title: quiz.title }} />
    </div>
  )
}

QuizItem.Skeleton = function QuizItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}