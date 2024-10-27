"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

import { Question } from "@/types/question"

import { EditPostModal } from "./EditPostModal"

interface EditPostClientProps {
  post: Pick<Post, "id" | "title">
}

export function EditPostClient({ post }: EditPostClientProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [currentTitle, setCurrentTitle] = React.useState(post.title)

  const handleEditClick = () => {
    setIsModalOpen(true) // Open the modal when the title is clicked
  }

  const handleSave = async (newTitle: string) => {
    setIsModalOpen(false) // Close the modal
    setCurrentTitle(newTitle) // Update the title in the UI

    // Send the updated title to the server
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })

    if (response.ok) {
      router.refresh() // Refresh the page after saving
    } else {
      console.error("Failed to update the post")
    }
  }

  return (
    <>
      <button onClick={handleEditClick} className="text-left">
        {currentTitle}
      </button>

      {isModalOpen && (
        <EditPostModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          post={post}
          onSave={handleSave}
        />
      )}
    </>
  )
}
