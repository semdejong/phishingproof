import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Client } from "postmark"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"

const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "naam@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: {
            email: {
              equals: credentials?.email,
              mode: "insensitive",
            },
          },
        })

        if (!user) {
          throw new Error("Wrong credentials")
        }

        if (user.verification_token) {
          throw new Error("Account not verified")
        }

        const passwordMatch = await compare(
          credentials?.password || "",
          user.password
        )

        if (!passwordMatch) {
          throw new Error("Wrong credentials")
        }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        firstName: dbUser.firstname,
        lastName: dbUser.lastname,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
