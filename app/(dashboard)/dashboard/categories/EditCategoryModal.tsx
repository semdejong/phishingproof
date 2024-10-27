"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"
import { PlusCircle, Trash2 } from "lucide-react"

import { Question } from "@/types/question"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PatchArea from "@/components/ui/patch-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export interface EditPostModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  category: any
  // onSave: (newTitle: string) => Promise<void>
  // onAddQuestions: (questions: Question[]) => Promise<void>
}

export function EditCategoryModal({
  isOpen,
  setIsOpen,
  category,
}: // onSave,
// onAddQuestions,
EditPostModalProps) {
  console.log(1212121, category)
  const [categoryTitle, setCategoryTitle] = React.useState(category.name)
  const [questions, setQuestions] = React.useState<Question[]>(
    category.Questions || []
  )
  const [editModeQuestion, setEditModeQuestion] = React.useState<
    string | null
  >()
  const [newQuestion, setNewQuestion] = React.useState("")
  const [newAnswers, setNewAnswers] = React.useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = React.useState(0)
  const router = useRouter()

  const handleAddQuestion = async () => {
    console.log(
      1728127182,
      newAnswers.map((answer, index) => ({
        answer,
        isCorrect: index === correctAnswer,
      })),
      correctAnswer
    )

    const response = await fetch(`/api/questions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionLabel: newQuestion,
        categoryId: category.id,
        answers: newAnswers.map((answer, index) => ({
          answer,
          isCorrect: index === correctAnswer,
        })),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      })
    }

    toast({
      title: "Question added successfully!",
    })

    const data = await response.json()

    if (newQuestion.trim() && newAnswers.every((answer) => answer.trim())) {
      setQuestions([
        ...questions,
        {
          id: data.id,
          question: newQuestion,
          Answers: newAnswers.map((answer, index) => ({
            answer,
            isCorrect: index === correctAnswer,
          })),
        },
      ])
      setNewQuestion("")
      setNewAnswers(["", "", "", ""])
      setCorrectAnswer(0)
    }
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    const response = await fetch(`/api/categories/patch?id=${category.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: categoryTitle,
      }),
    })

    if (response.ok) {
      setIsOpen(false)
      router.refresh()
      console.log("meow")
      return
    }

    const error = await response.json()
    toast({
      title: "Something went wrong.",
      description: error.message,
      variant: "destructive",
    })
    console.log("saved")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Test</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Quiz Category</DialogTitle>
        </DialogHeader>
        <Card className="border-none pt-4">
          <CardContent className="space-y-4 border-none px-0">
            <div>
              <Label htmlFor="category-title" className="mb-1">
                Category Title
              </Label>
              <Input
                id="category-title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="Enter category title"
              />
            </div>

            <div>
              <Label htmlFor="new-question" className="mb-1">
                New Question
              </Label>
              <Textarea
                id="new-question"
                value={newQuestion}
                className="resize-none"
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter new question"
              />
            </div>

            <div className="space-y-2">
              <Label>Answers</Label>
              {newAnswers.map((answer, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={answer}
                    onChange={(e) => {
                      const updatedAnswers = [...newAnswers]
                      updatedAnswers[index] = e.target.value
                      setNewAnswers(updatedAnswers)
                    }}
                    placeholder={`Answer ${index + 1}`}
                  />
                  <RadioGroup
                    value={correctAnswer.toString()}
                    onValueChange={(value) => setCorrectAnswer(parseInt(value))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`answer-${index}`}
                      />
                      <Label htmlFor={`answer-${index}`}>Correct</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>

            <Button onClick={handleAddQuestion} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Question
            </Button>

            <div>
              <Label>Questions</Label>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {questions.map((question, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-0 pt-2">
                      <CardTitle className="text-sm font-medium">
                        Question {index + 1}
                      </CardTitle>
                      <div className="flex flex-row items-center justify-center space-x-4">
                        <Button
                          onClick={() =>
                            setEditModeQuestion(
                              editModeQuestion
                                ? editModeQuestion === question.id
                                  ? null
                                  : question.id
                                : question.id
                            )
                          }
                          variant="outline"
                          size="sm"
                        >
                          {editModeQuestion !== question.id ? (
                            <Icons.edit className="h-4 w-4" />
                          ) : (
                            <Icons.editOff className="h-4 w-4" />
                          )}
                        </Button>

                        <Button variant="default" size="sm">
                          <Icons.email className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveQuestion(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 px-6 pb-4">
                      <p className="font-bold">
                        <PatchArea
                          currentText={question.question}
                          bodyfield={"label"}
                          cb={(value) => {
                            setQuestions(
                              questions.map((q) =>
                                q.id === question.id
                                  ? { ...q, question: value }
                                  : q
                              )
                            )
                          }}
                          apiUrl={"/api/questions/patch?id=" + question.id}
                          editing={editModeQuestion === question.id}
                          placeholder={"Question"}
                        />
                      </p>
                      <ul className="mt-2 grid grid-cols-2 space-y-1">
                        {question.Answers.map((answer, answerIndex) => (
                          <li
                            key={answerIndex}
                            className={`text-sm ${
                              answer.isCorrect
                                ? "font-medium text-green-600"
                                : ""
                            }`}
                          >
                            <div className="w-40">
                              <PatchArea
                                currentText={answer.answer}
                                bodyfield={"label"}
                                cb={(value) => {
                                  setQuestions(
                                    questions.map((q) =>
                                      q.id === question.id
                                        ? {
                                            ...q,
                                            Answers: q.Answers.map((a) =>
                                              a.id === answer.id
                                                ? { ...a, answer: value }
                                                : a
                                            ),
                                          }
                                        : q
                                    )
                                  )
                                }}
                                apiUrl={"/api/answers/patch?id=" + answer.id}
                                editing={editModeQuestion === question.id}
                                placeholder={"Answer " + (answerIndex + 1)}
                              />
                            </div>

                            {answer.isCorrect && " (Correct)"}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
