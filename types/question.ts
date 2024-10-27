export type Question = {
  id: string
  question: string
  Answers: any[]
  image?: string
  variant?: ["regular-mcq", "mcq-with-image", "analyze-email"]
}
