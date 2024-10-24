"use client"

import * as React from "react"
import { Post } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Question } from "@/types/question"


export interface EditPostModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  post: Pick<Post, "id" | "title">
  onSave: (newTitle: string) => Promise<void>
  onAddQuestions: (questions: Question[]) => Promise<void>
}

export function EditPostModal({ isOpen, setIsOpen, post, onSave, onAddQuestions }: EditPostModalProps) {
  const [categoryTitle, setCategoryTitle] = React.useState(post.title)
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [newQuestion, setNewQuestion] = React.useState("")
  const [newAnswers, setNewAnswers] = React.useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = React.useState(0)

  const handleAddQuestion = () => {
    if (newQuestion.trim() && newAnswers.every(answer => answer.trim())) {
      setQuestions([...questions, {
        question: newQuestion,
        answers: newAnswers,
        correctAnswer: correctAnswer
      }])
      setNewQuestion("")
      setNewAnswers(["", "", "", ""])
      setCorrectAnswer(0)
    }
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave(categoryTitle)
    if(questions.length) {
      onAddQuestions(questions)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl ">
        <DialogHeader>
          <DialogTitle>Edit Quiz Category</DialogTitle>
        </DialogHeader>
        <Card className="border-none pt-4">
          <CardContent className="space-y-4 border-none px-0">
            <div>
              <Label htmlFor="category-title" className="mb-1">Category Title</Label>
              <Input
                id="category-title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="Enter category title"
              />
            </div>

            <div>
              <Label htmlFor="new-question" className="mb-1">New Question</Label>
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
                  <RadioGroup value={correctAnswer.toString()} onValueChange={(value) => setCorrectAnswer(parseInt(value))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className=" p-0 px-6 pb-4">
                      <p className="text-sm font-bold">{question.question}</p>
                      <ul className="mt-2 grid grid-cols-2 space-y-1">
                        {question.answers.map((answer, answerIndex) => (
                          <li
                            key={answerIndex}
                            className={`text-sm ${
                              answerIndex === question.correctAnswer
                                ? "font-medium text-green-600"
                                : ""
                            }`}
                          >
                            {answer}
                            {answerIndex === question.correctAnswer && " (Correct)"}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}