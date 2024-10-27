import { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import { authenticatedAdmin } from "@/app/api/utils/authentication"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // Handle GET request
    res
      .status(400)
      .json({ message: "You can only use post verb to this endpoint" })
  }

  const session = (await authenticatedAdmin(req, res)) as any

  if (!session) {
    return res
  }

  // Handle POST request
  const questionLabel = req.body.questionLabel
  const categoryId = req.body.categoryId
  const answers = req.body.answers

  if (!questionLabel) {
    return res.status(400).json({ message: "Question label is required" })
  }

  if (!categoryId) {
    return res.status(400).json({ message: "Category id is required" })
  }

  const category = await db.categories.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!category) {
    return res.status(400).json({ message: "Category not found" })
  }

  if (questionLabel.length < 2) {
    return res.status(400).json({
      message:
        "Question label is required and must be at least 2 charaters long",
    })
  }

  if (!answers || !Array.isArray(answers) || answers.length < 4) {
    return res.status(400).json({
      message: "Answers are required and must be at least 4 of them",
    })
  }

  let amountOfCorrectAnswers = 0

  try {
    answers.forEach((answer: any) => {
      if (!answer.answer || answer?.answer?.length < 2) {
        return res.status(400).json({
          message: "Answer is required and must be at least 2 charaters long",
        })
      }

      if (answer.isCorrect) {
        amountOfCorrectAnswers++
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Something went wrong while trying to validate the answers",
    })
  }

  if (amountOfCorrectAnswers < 1) {
    return res.status(400).json({
      message: "At least one answer must be correct",
    })
  }

  const question = await db.questions.create({
    data: {
      question: questionLabel,
      categoryId: categoryId,
    },
  })

  const answersToCreate = answers.map((answer: any) => {
    return {
      questionId: question.id,
      answer: answer.answer,
      isCorrect: answer.isCorrect,
    }
  })

  await db.answers.createMany({
    data: answersToCreate,
  })

  const createdQuestion = await db.questions.findUnique({
    where: {
      id: question.id,
    },
    include: {
      Answers: true,
    },
  })

  res.status(200).json({ question: createdQuestion })
}
