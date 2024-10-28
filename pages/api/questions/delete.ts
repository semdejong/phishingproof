import { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import { authenticatedAdmin } from "@/app/api/utils/authentication"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    // Handle GET request
    res
      .status(400)
      .json({ message: "You can only use DELETE verb to this endpoint" })
  }

  const session = (await authenticatedAdmin(req, res)) as any

  if (!session) {
    return res
  }

  // Handle POST request
  const id = req.query.id as string

  const question = await db.questions.findUnique({
    where: {
      id: id,
    },
  })

  if (!question) {
    return res.status(400).json({ message: "Question not found" })
  }

  const deletedAnswers = await db.answers.deleteMany({
    where: {
      questionId: id,
    },
  })

  const deletedQuestion = await db.questions.delete({
    where: {
      id: id,
    },
  })

  res.status(200).json({ question: deletedQuestion })
}
