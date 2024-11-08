import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BarChart } from "@/components/ui/bar-chart"
import { LineChart } from "@/components/ui/line-chart"
import { PieChart } from "@/components/ui/pie-chart"
import { RadarChart } from "@/components/ui/radar-chart"
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

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Keep track of the general progress"
      ></DashboardHeader>
      <div className="flex flex-col space-y-4">
        <BarChart />
        <div className=" flex flex-row justify-between">
          <RadarChart />
          <LineChart />
          <PieChart />
        </div>
      </div>
    </DashboardShell>
  )
}
