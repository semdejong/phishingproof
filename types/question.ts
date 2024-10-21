export type Question = {
  question: string
  options?: string[]
  openAnswer?: string;
  correctAnswer?: number
  image?: string
  variant: "image-based-mcq" | "MCQ" | "email-based-mcq" | "text-based-open-ended";
}
