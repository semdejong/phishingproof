export type Question = {
  question: string
  options: string[]
  correctAnswer: number
  image?: string
  variant: ["regular-mcq", "mcq-with-image", "analyze-email"]
}
