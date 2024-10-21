"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

type FormData = z.infer<typeof userAuthSchema>

export function UserRegisterForm({ className, ...props }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [firstname, setFirstname] = React.useState<string>("")
  const [lastname, setLastname] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const searchParams = useSearchParams()

  const { push } = useRouter()

  async function onSubmit() {
    setIsLoading(true)

    //make post request
    const result = await fetch("/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    })

    const signInResult = (await result.json()) || ({} as any)

    setIsLoading(false)

    if (result.status !== 200) {
      setPassword("")
      return toast({
        title: "Error signing up.",
        description:
          signInResult.message || "Uw request kon niet worden verwerkt.",
        variant: "destructive",
      })
    }

    setFirstname("")
    setLastname("")
    setEmail("")
    setPassword("")

    // router.push("/login")

    return toast({
      title: "Welcome to PhishingProof.",
      description: "You are ready to become un-hooked.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="flex w-full space-x-2">
          <div className="">
            <Label className="sr-only" htmlFor="email">
              First Name
            </Label>
            <Input
              id="firstname"
              placeholder="John"
              value={firstname}
              type="text"
              autoComplete="name"
              autoCorrect="off"
              onChange={(e) => setFirstname(e.target.value)}
              disabled={isLoading}
            />
            {/* {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )} */}
          </div>
          <div className="">
            <Label className="sr-only" htmlFor="email">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Doe"
              value={lastname}
              type="text"
              autoComplete="name"
              autoCorrect="off"
              onChange={(e) => setLastname(e.target.value)}
              disabled={isLoading}
            />
            {/* {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )} */}
          </div>
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            value={email}
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
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
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            onChange={(e) => setPassword(e.target.value)}
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
          Sign up
        </button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR IF YOU ALREADY HAVE AN ACCOUNT
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => push("/login")}
        disabled={isLoading}
      >
        Sign in
      </button>
    </div>
  )
}
