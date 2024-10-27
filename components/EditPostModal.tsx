"use client"

import * as React from "react"
import { Post } from "@prisma/client"

interface EditPostModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  post: Pick<Post, "id" | "title">
  onSave: (newTitle: string) => void
}

export function EditPostModal({
  isOpen,
  setIsOpen,
  post,
  onSave,
}: EditPostModalProps) {
  const [newTitle, setNewTitle] = React.useState<string>(post.title)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [newQuestion, setNewQuestion] = React.useState<string>("") // State for the new question input
  const [questions, setQuestions] = React.useState<string[]>([]) // State to manage the list of questions

  // Function to handle saving the post title
  async function handleSave() {
    setIsLoading(true)

    // Simulate saving the updated title
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate async request
    setIsLoading(false)
    onSave(newTitle) // Call onSave handler to update the title
    setIsOpen(false) // Close the modal
  }

  // Function to add a new question to the list
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]) // Add new question to the array
      setNewQuestion("") // Clear the input field after adding
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Edit Post Title</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter post title"
          className="mb-4 w-full rounded border border-gray-300 p-2"
        />

        <h3 className="text-md mb-4 font-semibold">Add Questions</h3>
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter a question"
            className="w-full rounded border border-gray-300 p-2"
          />
          <button
            onClick={handleAddQuestion}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            +
          </button>
        </div>

        {/* Display the list of questions with scroll */}
        <h3 className="text-md mb-4 font-semibold">Questions</h3>
        <ul
          className="mb-4 list-disc overflow-y-auto overflow-x-hidden border border-gray-300"
          style={{ maxHeight: "150px" }} // Set max height for the list to scroll after 6 questions
        >
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col items-center ">
              <div className="ml-1 mt-2 w-full p-2 text-left text-sm">
                {question}
              </div>
              <div className="mt-2 h-[1px] w-[97%]   border-b  border-b-gray-300 " />
            </div>
          ))}
        </ul>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-500 px-4 py-2 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}
