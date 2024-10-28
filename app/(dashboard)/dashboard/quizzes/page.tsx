import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { QuizItem } from "@/components/quiz-client"
import { QuizCreateButton } from "@/components/quiz-create"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quizzes = await db.quizzes.findMany({
    include: {
      categories: {
        include: {
          Questions: {
            include: {
              Answers: true,
            },
          },
          Post: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
  //fetch categories to pass them to the quiz create button
  const pageSize = 20
  const page = 1
  const categories = await db.categories.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      Questions: {
        include: {
          Answers: true,
        },
      },
      Post: true,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Quizzes" text="Create and manage quizzes.">
        <QuizCreateButton categories={categories} />
      </DashboardHeader>
      <div>
        {quizzes?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {quizzes.map((quiz) => (
              <QuizItem key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Quizzes created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any categories yet. Start creating quizzes.
            </EmptyPlaceholder.Description>
            <QuizCreateButton variant="outline" categories={categories} />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
