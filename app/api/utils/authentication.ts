import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function authenticated(
  req: NextApiRequest,
  res: NextApiResponse,
  returnRes = true
) {
  const bearer = req.headers.authorization
  const session = (await getServerSession(req, res, authOptions)) || null

  if (!session && !bearer) {
    if (returnRes) {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return null
    }
  }

  if (bearer) {
    const token = bearer.split(" ")[1]
    const user = await db.user.findUnique({
      where: {
        APIKey: token,
      },
    })

    if (!user) {
      if (returnRes) {
        return res.status(401).json({ message: "Unauthorized" })
      } else {
        return null
      }
    }

    return user
  }

  if (!session) {
    if (returnRes) {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return null
    }
  }

  const user = await db.user.findFirst({
    where: {
      email: {
        equals: session.user.email,
        mode: "insensitive",
      },
    },
  })

  if (!user) {
    if (returnRes) {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return null
    }
  }

  console.log(9893823, user)

  return user
}

export async function authenticatedAdmin(
  req: NextApiRequest,
  res: NextApiResponse,
  returnRes = true
) {
  const user = await authenticated(req, res, returnRes)

  if (user && user.role === "admin") {
    return user
  } else {
    if (returnRes) {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return null
    }
  }
}
