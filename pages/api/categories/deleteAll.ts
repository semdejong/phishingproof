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

  await db.answers.deleteMany({}).then(() => {})

  await db.questions.deleteMany({}).then(() => {})

  await db.categories.deleteMany({}).then(() => {
    return res.status(200).json({ message: "All categories deleted" })
  })
}
