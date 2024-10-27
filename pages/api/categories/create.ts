import { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import { authenticatedAdmin } from "@/app/api/utils/authentication"

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

  const session = (await authenticatedAdmin(req, res)) as any

  if (!session) {
    return res
  }

  // Handle POST request
  let label = req.body.label

  if (!label || label === "") {
    label = "Category #" + uuidv4()
  }

  if (!label) {
    return res.status(400).json({ message: "Label is required" })
  }

  if (label.length < 2) {
    return res.status(400).json({
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
      if (category) {
        return res.status(400).json({ message: "Category already exists" })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json({
        message: "Something went wrong while trying to connect to the db",
      })
    })

  const category = await db.categories.create({
    data: {
      name: label,
    },
  })

  return res.status(200).json({ category })
}
