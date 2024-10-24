import { NextApiRequest, NextApiResponse } from "next"

import { db } from "@/lib/db"
import { authenticatedAdmin } from "@/app/api/utils/authentication"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    // Handle POST request
    res
      .status(400)
      .json({ message: "You can only use GET verb to this endpoint" })
  }

  const session = (await authenticatedAdmin(req, res)) as any

  if (!session) {
    return res
  }

  const pageSize = req.query.pageSize
    ? parseInt(String(req.query.pageSize))
    : 10
  const page = parseInt(String(req.query.page) || "1")

  const totalQuestions = await db.questions.count({})

  const questions = await db.questions.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      Answers: true,
    },
  })

  res.status(200).json({ questions, totalQuestions })
}
