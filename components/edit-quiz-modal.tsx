"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Categories, Quizzes } from "@prisma/client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface EditQuizModalProps {
  quiz: any
  allCategories: Categories[]
}

export function EditQuizModal({ quiz, allCategories }: EditQuizModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [quizName, setQuizName] = React.useState(quiz.title)
  const [linkedCategories, setLinkedCategories] = React.useState(
    quiz.categories
  )

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/quizzes/${quiz.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: quizName,
          categoryIds: linkedCategories.map((cat) => cat.id),
        }),
      })

      if (response.ok) {
        setIsOpen(false)
        router.refresh()
        toast({
          title: "Quiz updated successfully",
        })
      } else {
        throw new Error("Failed to update the quiz")
      }
    } catch (error) {
      console.error("Failed to update the quiz", error)
      toast({
        title: "Something went wrong",
        description: "Failed to update the quiz. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleCategory = (category: Categories) => {
    setLinkedCategories((prev) =>
      prev.some((c) => c.id === category.id)
        ? prev.filter((c) => c.id !== category.id)
        : [...prev, category]
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 text-[16px] font-bold">
          {quiz.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Quiz</DialogTitle>
          <DialogDescription>
            Make changes to your quiz here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="quiz-name" className="w-auto">
              Name
            </Label>
            <Input
              id="quiz-name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="grow"
            />
          </div>
          <div className="space-y-2">
            <Label>Linked Categories</Label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    linkedCategories.some((c) => c.id === category.id)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
