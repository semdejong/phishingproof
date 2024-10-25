import Link from "next/link"
import { Categories, Post } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"

import { EditPostClient } from "./EditPostClient"

interface CategoryItemProps {
  category: Categories
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="font-semibold hover:underline">
          {category.name}
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            {formatDate(category.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: category.id, title: category.name }} />
    </div>
  )
}

CategoryItem.Skeleton = function CategoryItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
