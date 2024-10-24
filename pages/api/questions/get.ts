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
  const id = req.query.id as string

  if (!session) {
    return res
  }

  const question = await db.questions.findFirst({
    where: {
      id: req.query.id as string,
    },

    include: {
      Answers: true,
    },
  })

  return res.status(200).json({ question })
}
