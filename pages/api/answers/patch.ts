import { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import { authenticatedAdmin } from "@/app/api/utils/authentication"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    // Handle GET request
    res
      .status(400)
      .json({ message: "You can only use patch verb to this endpoint" })
  }

  const session = (await authenticatedAdmin(req, res)) as any

  if (!session) {
    return res
  }

  // Handle patch request
  let label = req.body.label as string
  const questionId = req.body.categoryId as string
  const isCorrect = req.body.isCorrect as boolean
  const id = req.query.id as string

  if (label && typeof label === "string" && label.length >= 0) {
    label = label.trim()
    // patch label
    await db.answers.update({
      where: {
        id: id,
      },
      data: {
        answer: label,
      },
    })
  }

  if (questionId && typeof questionId === "string" && questionId.length >= 0) {
    const question = await db.categories.findUnique({
      where: {
        id: questionId,
      },
    })

    if (!question) {
      return res.status(400).json({ message: "Question not found" })
    }

    // patch category
    await db.answers.update({
      where: {
        id: id,
      },
      data: {
        questionId: questionId,
      },
    })
  }

  const allAnswersToQuestion = await db.answers.findMany({
    where: {
      questionId: questionId,
    },
  })

  let amountOfCorrectAnswers = 0

  try {
    allAnswersToQuestion.forEach((answer: any) => {
      if (answer.isCorrect && answer.id !== id) {
        amountOfCorrectAnswers++
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Something went wrong",
    })
  }

  if (isCorrect) {
    amountOfCorrectAnswers++
  }

  if (amountOfCorrectAnswers < 1) {
    return res.status(400).json({
      message: "At least one answer must be correct",
    })
  }

  await db.answers.update({
    where: {
      id: id,
    },
    data: {
      isCorrect: isCorrect,
    },
  })

  const answer = await db.answers.findUnique({
    where: {
      id: id,
    },
  })

  return res.status(200).json({ answer })
}
