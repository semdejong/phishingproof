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
  const id = req.query.id as string

  if (!label || label === "") {
    label = "Quiz #" + uuidv4()
  }

  if (!label) {
    res.status(400).json({ message: "Label is required" })
  }

  if (label.length < 2) {
    res.status(400).json({
      message: "Label is required and must be at least 2 charaters long",
    })
  }

  await db.categories
    .findFirst({
      where: {
        name: {
          equals: label,
          mode: "insensitive",
        },
      },
    })
    .then((category) => {
      if (category && category.id !== id) {
        return res.status(400).json({ message: "Category already exists" })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json({
        message: "Something went wrong while trying to connect to the db",
      })
    })

  const category = await db.categories.update({
    where: {
      id: id,
    },
    data: {
      name: label,
    },
  })

  return res.status(200).json({ category })
}
