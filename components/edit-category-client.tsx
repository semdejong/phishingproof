"use client"

// Client-side interaction
import * as React from "react"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

import { EditCategoryModal } from "@/app/(dashboard)/dashboard/categories/EditCategoryModal"

interface EditCategoryClientProps {
  category: any
}

export function EditCategoryClient({ category }: EditCategoryClientProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [currentTitle, setCurrentTitle] = React.useState(category.title)

  const handleEditClick = () => {
    setIsModalOpen(true) // Open the modal when the title is clicked
  }

  const switchModal = (value) => {
    setIsModalOpen(value)
    router.refresh()
  }

  return (
    <>
      <button onClick={handleEditClick} className="text-left">
        {category.name}
      </button>

      {isModalOpen && (
        <EditCategoryModal
          isOpen={isModalOpen}
          setIsOpen={switchModal}
          category={category}
          // onSave={handleSave} // Uncommented to use the function
        />
      )}
    </>
  )
}
