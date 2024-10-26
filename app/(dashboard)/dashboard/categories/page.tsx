// import { redirect } from "next/navigation"

// import { authOptions } from "@/lib/auth"
// import { db } from "@/lib/db"
// import { getCurrentUser } from "@/lib/session"
// import { EmptyPlaceholder } from "@/components/empty-placeholder"
// import { DashboardHeader } from "@/components/header"
// import { PostCreateButton } from "@/components/post-create-button"
// import { PostItem } from "@/components/post-item"
// import { DashboardShell } from "@/components/shell"

// export const metadata = {
//   title: "Dashboard",
// }

// export default async function DashboardPage() {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/login")
//   }

//   const categories = await db.post.findMany({
//     where: {
//       authorId: user.id,
//     },
//     select: {
//       id: true,
//       title: true,
//       published: true,
//       createdAt: true,
//     },
//     orderBy: {
//       updatedAt: "desc",
//     },
//   })

//   return (
//     <DashboardShell>
//       <DashboardHeader
//         heading="Categories"
//         text="Create and manage categories."
//       >
//         <PostCreateButton />
//       </DashboardHeader>
// <div>
//   {categories?.length ? (
//     <div className="divide-border divide-y rounded-md border">
//       {categories.map((post) => (
//         <PostItem key={post.id} post={post} />
//       ))}
//     </div>
//   ) : (
//     <EmptyPlaceholder>
//       <EmptyPlaceholder.Icon name="post" />
//       <EmptyPlaceholder.Title>
//         No categories created
//       </EmptyPlaceholder.Title>
//       <EmptyPlaceholder.Description>
//         You don&apos;t have any categories yet. Start creating categories.
//       </EmptyPlaceholder.Description>
//       <PostCreateButton variant="outline" />
//     </EmptyPlaceholder>
//   )}
// </div>
//     </DashboardShell>
//   )
// }

import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { CategoryCreateButton } from "@/components/category-create"
import { CategoryItem } from "@/components/category-item"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default async function DashboardPage() {
  const pageSize = 20
  const page = 1
  const user = (await getCurrentUser()) as any

  console.log(user)
  if (!user || user.role !== "admin") {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  //get categories via /api/categories/getAll
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
      <DashboardHeader
        heading="Categories"
        text="Create and manage categories."
      >
        <CategoryCreateButton variant="default" />
      </DashboardHeader>
      <div>
        {categories?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {categories.map((category) => (
              <div key={category.id}>
                {" "}
                {/* Assuming category has an id */}
                <CategoryItem category={category} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No categories created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any categories yet. Start creating categories.
            </EmptyPlaceholder.Description>
            <CategoryCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
