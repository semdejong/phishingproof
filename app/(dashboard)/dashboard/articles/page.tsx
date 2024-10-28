import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categories = await db.categories.findMany({})

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      categoryId: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Articles" text="Create and manage articles.">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <>
            {categories.map((category) => {
              return (
                <div className="flex flex-col">
                  <h1 className="mb-1 mt-2 text-xl font-bold" key={category.id}>
                    {category.name}
                  </h1>
                  <div className="divide-y divide-border rounded-md border">
                    {posts.map((post) =>
                      post.categoryId === category.id ? (
                        <PostItem key={post.id} post={post} />
                      ) : null
                    )}
                  </div>
                </div>
              )
            })}
            <h1 className="mb-1 mt-2 text-xl font-bold">Unassigned</h1>
            <div className="divide-y divide-border rounded-md border">
              {posts.map((post) =>
                post.categoryId === null ? (
                  <PostItem key={post.id} post={post} />
                ) : null
              )}
            </div>
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No articles created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any articles yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
