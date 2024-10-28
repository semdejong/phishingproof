import { NextApiRequest, NextApiResponse } from "next"

import { db } from "@/lib/db"
import {
  authenticated,
  authenticatedAdmin,
} from "@/app/api/utils/authentication"

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

  const session = (await authenticated(req, res)) as any
  const id = req.query.id as string

  if (!session) {
    return res
  }

  const questionInstance = await db.questionInstance.findFirst({
    where: {
      id: req.query.id as string,
    },
    include: {
      Question: {
        include: {
          Answers: {
            select: {
              id: true,
              answer: true,
            },
          },
        },
      },
    },
  })

  return res.status(200).json({ question: questionInstance?.Question })
}
