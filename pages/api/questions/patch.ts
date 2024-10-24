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
  const categoryId = req.body.categoryId as string
  const id = req.query.id as string

  if (label && typeof label === "string" && label.length >= 0) {
    label = label.trim()
    // patch label
    await db.questions.update({
      where: {
        id: id,
      },
      data: {
        question: label,
      },
    })
  }

  if (categoryId && typeof categoryId === "string" && categoryId.length >= 0) {
    const category = await db.categories.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      return res.status(400).json({ message: "Category not found" })
    }

    // patch category
    await db.questions.update({
      where: {
        id: id,
      },
      data: {
        categoryId: categoryId,
      },
    })
  }

  const question = await db.questions.findUnique({
    where: {
      id: id,
    },
  })

  return res.status(200).json({ question })
}
