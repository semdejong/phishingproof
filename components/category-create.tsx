"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface CategoryCreateButtonProps extends ButtonProps {}

export function CategoryCreateButton({
  className,
  variant,
  ...props
}: CategoryCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [categoryName, setCategoryName] = React.useState<string>("")

  async function onSave() {
    if (!categoryName) {
      return toast({
        title: "Please enter a category name.",
        variant: "destructive",
      })
    }
    setIsLoading(true)
    const response = await fetch("/api/category/create.ts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: categoryName,
      }),
    })

    setIsLoading(false)
    setIsModalOpen(false)

    if (!response.ok) {

      if (response.status === 402) {
        return toast({
          title: "Limit of 3 categories reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your category was not created. Please try again.",
        variant: "destructive",
      })
    }

    const category = await response.json()
    toast({
      title: "Category created successfully!",
    })

    router.refresh()
    // router.push(`/editor/${post.id}`)
  }

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          buttonVariants({ variant }),
          { "cursor-not-allowed opacity-60": isLoading },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.add className="mr-2 h-4 w-4" />
        )}
        New Category
      </button>

      {/* Modal for input */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Create New Category</h2>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className={cn(buttonVariants({ variant: "default" }), {
                  "cursor-not-allowed opacity-60": isLoading,
                })}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
