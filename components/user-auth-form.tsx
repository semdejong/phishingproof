"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const searchParams = useSearchParams()

  const { push } = useRouter()

  async function onSubmit() {
    setIsLoading(true)

    const status = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: searchParams?.get("from") || undefined,
    })

    setIsLoading(false)

    if (status?.ok) {
      window.location.href = searchParams?.get("from") || "/dashboard"
      return
    }

    return toast({
      title: "Something went wrong.",
      description: status?.error || "Unknown issue occured.",
      variant: "destructive",
      action: status?.error?.includes("verified") ? (
        <>
          <Button onClick={() => push("/account/verify/reset")}>
            Nieuwe verificatie code
          </Button>
        </>
      ) : (
        <></>
      ),
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          {/* {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )} */}
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Password
          </Label>
          <Input
            id="password"
            placeholder="********"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            disabled={isLoading}
          />
          {/* {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )} */}
        </div>
        <button
          className={cn(buttonVariants())}
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            IF YOU DON&apos;T HAVE AN ACCOUNT
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          push("/register")
        }}
        className={cn(buttonVariants({ variant: "outline" }))}
        disabled={isLoading}
      >
        Create an account
      </button>
    </div>
  )
}
