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
  const categories = req.body.categories

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

  if (!categories || !Array.isArray(categories) || categories.length < 1) {
    res.status(400).json({
      message: "Categories are required and must be at least 1 of them",
    })
  }

  //check if categories exist
  for (let i = 0; i < categories.length; i++) {
    const category = await db.categories.findUnique({
      where: {
        id: categories[i].id,
      },
    })

    if (!category) {
      return res.status(400).json({ message: "Category not found" })
    }
  }

  await db.quizzes
    .findFirst({
      where: {
        title: {
          equals: label,
          mode: "insensitive",
        },
      },
    })
    .then((category) => {
      if (category) {
        return res.status(400).json({ message: "Quiz already exists" })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json({
        message: "Something went wrong while trying to connect to the db",
      })
    })

  const quiz = await db.quizzes.create({
    data: {
      title: label,
      categories: {
        connect: categories.map((category: any) => {
          return {
            id: category.id,
          }
        }),
      },
    },
  })

  return res.status(200).json({ quiz })
}
