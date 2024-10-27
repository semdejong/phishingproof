import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

import { db } from "./db"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  })

  return user
}
