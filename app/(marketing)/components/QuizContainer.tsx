import { ElementType } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface QuizContainerProps {
  title: string
  description: string
  Icon: ElementType
  buttonText: string
  quizId: string
}

export default function QuizContainer({
  title,
  description,
  Icon,
  buttonText,
  quizId,
}: QuizContainerProps) {
  const router = useRouter()
  const startQuiz = async () => {
    const quizInstance = await fetch("/api/quizzes/start?id=" + quizId, {
      method: "POST",
    })

    if (!quizInstance.ok) {
      const err = await quizInstance.json()
      toast({
        title: "Failed to start quiz",
        description: err.message,
        variant: "destructive",
      })
    } else {
      const quiz = await quizInstance.json()
      console.log(27372, quiz)
      router.push(
        `/quizzes/${quiz.quizInstance.id}?question=${quiz.nextQuestionInstance.id}`
      )
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2 duration-200 ease-in-out hover:m-1 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className="flex h-[250px] flex-col items-center justify-between rounded-md p-4 ">
        <Icon className="size-[40px] text-red-500" />
        <div className="flex flex-col items-center space-y-2">
          <h3 className="font-bold ">{title}</h3>
          <p className="text-center text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Button
          onClick={startQuiz}
          className="mt-3 rounded-full bg-[#ff4545] px-5 py-1.5 text-sm text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#8d3b3b] "
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
