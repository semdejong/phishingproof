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

import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from "@/lib/auth"
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { CategoryItem } from '@/components/category-item'
import { CategoryCreateButton } from '@/components/category-create'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
      redirect(authOptions?.pages?.signIn || "/login")
    }
  
    //get categories via /api/categories/getAll
    const categories = await fetch(`/api/categories/getAll?page=1&pageSize=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  
    console.log(categories)
    return (
      <DashboardShell>
        <DashboardHeader heading="Categories" text="Create and manage categories." />
        <div>
          {categories?.length ? (
            <div className="divide-border divide-y rounded-md border">
              {categories.map((category) => (
                <div key={category.id}> {/* Assuming category has an id */}
                  <CategoryItem category={category} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No categories created</EmptyPlaceholder.Title>
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

