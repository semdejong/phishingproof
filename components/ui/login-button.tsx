"use client"

import React from "react"
import Link from "next/link"
import { getSession } from "next-auth/react"

import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"

export default function LoginButton() {
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    async function fetchUser() {
      const session = await getSession()

      setUser(session)
    }

    fetchUser()
  }, [])

  return (
    <Link
      href={user ? "/dashboard" : "/login"}
      className={cn(
        buttonVariants({ variant: "secondary", size: "sm" }),
        "px-4"
      )}
    >
      {user ? "Dashboard" : "Login"}
    </Link>
  )
}
