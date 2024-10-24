export type Question = {
  question: string
  answers: string[]
  correctAnswer: number
  image?: string
  variant?: ["regular-mcq", "mcq-with-image", "analyze-email"]
}
