import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserRegisterForm } from "@/components/user-register-form"
import TypingSlogan from "@/app/(marketing)/components/TypingSlogan"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full items-center justify-center bg-muted lg:flex lg:flex-col">
        <Icons.logo className="absolute left-56 top-72 h-[300px] w-[300px] rotate-12 text-red-500" />
        <Icons.fish className="absolute right-72 h-[200px] w-[200px] rotate-12 scale-x-[-1] " />
        <div className="h-3/4 "></div>
        <div className="h-1/4 text-2xl font-extrabold">
          <TypingSlogan />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-[40px] w-[40px] text-red-500" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in your details to create an account.
            </p>
          </div>
          <UserRegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking sign up, you agree to our
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms and Conditions
            </Link>{" "}
            and
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
