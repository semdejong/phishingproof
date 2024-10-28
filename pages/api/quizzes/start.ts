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

  console.log(72833234234, session)

  if (!session) {
    return res
  }

  // Handle POST request
  const quizId = req.query.id as string

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id is required" })
  }

  const quiz = await db.quizzes.findUnique({
    where: {
      id: quizId,
    },
    include: {
      categories: {
        include: {
          Questions: true,
        },
      },
    },
  })

  console.log(12122323, quiz)

  if (!quiz) {
    return res.status(400).json({ message: "Quiz not found" })
  }

  let quizInstance = null as any

  console.log(quiz.id, session.id)

  try {
    const quizInstanceExists = await db.quizInstance.findFirst({
      where: {
        quizId: quiz.id,
        userId: session.id,
      },
    })

    if (!quizInstanceExists) {
      //create quiz
      const temp = await db.quizInstance.create({
        data: {
          quizId: quiz.id,
          userId: session.id,
        },
      })

      quizInstance = temp

      //create question instance for all questions
      for (let i = 0; i < quiz.categories.length; i++) {
        for (let j = 0; j < quiz.categories[i].Questions.length; j++) {
          await db.questionInstance.create({
            data: {
              questionId: quiz.categories[i].Questions[j].id,
              quizInstanceId: quizInstance.id,
              answerId: null,
            },
          })
        }
      }
    } else {
      quizInstance = quizInstanceExists
    }

    const nextQuestionInstance = await db.questionInstance.findMany({
      where: {
        quizInstanceId: quizInstance.id,
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
      return res.status(200).json({ quizInstance, nextQuestionInstance: null })
    }

    //get random question
    const randomQuestion =
      nextQuestionInstance[
        Math.floor(Math.random() * nextQuestionInstance.length)
      ]
    return res
      .status(200)
      .json({ quizInstance, nextQuestionInstance: randomQuestion })
  } catch (error) {
    console.log(2323232, error)
    return res.status(400).json({ message: "Error creating quiz instance" })
  }
}
