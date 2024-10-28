import { NextApiRequest, NextApiResponse } from "next"
import { da } from "date-fns/locale"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import {
  authenticated,
  authenticatedAdmin,
} from "@/app/api/utils/authentication"

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

  const session = (await authenticated(req, res)) as any

  if (!session) {
    return res
  }

  // Handle POST request
  const questionInstanceId = req.query.question as string
  const answerId = req.body.answerId as string

  if (!questionInstanceId) {
    return res.status(400).json({ message: "question is required" })
  }

  const quiz = await db.questionInstance.findUnique({
    where: {
      id: questionInstanceId,
    },
  })

  if (!quiz) {
    return res.status(400).json({ message: "Quiz not found" })
  }

  const updatedQuestionInstance = await db.questionInstance.update({
    where: {
      id: questionInstanceId,
    },
    data: {
      answerId,
    },
  })

  const nextQuestionInstance = await db.questionInstance.findMany({
    where: {
      quizInstanceId: quiz.quizInstanceId,
      answerId: null,
    },
    include: {
      Question: {
        include: {
          Answers: {
            select: {
              answer: true,
            },
          },
        },
      },
    },
  })

  if (nextQuestionInstance.length === 0) {
    return res
      .status(200)
      .json({ quizInstance: quiz.quizInstanceId, nextQuestionInstance: null })
  }

  //get random question
  const randomQuestion =
    nextQuestionInstance[
      Math.floor(Math.random() * nextQuestionInstance.length)
    ]
  return res.status(200).json({
    quizInstance: quiz.quizInstanceId,
    nextQuestionInstance: randomQuestion,
  })
}
