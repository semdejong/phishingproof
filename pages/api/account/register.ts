import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"

const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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

  // Handle POST request
  const email = req.body.email

  if (!email || !validRegex.test(email)) {
    res.status(400).json({ message: "Email is not an valid email" })
  }

  if (!req.body.firstname || req.body.firstname.length < 2) {
    res.status(400).json({
      message: "Firstname is required and must be at least 2 charaters long",
    })
  }

  if (!req.body.lastname || req.body.lastname.length < 2) {
    res.status(400).json({
      message: "Lastname is required and must be at least 2 characters long",
    })
  }

  if (!req.body.password || req.body.password.length < 8) {
    res.status(400).json({
      message: "Password is required and must be at least 8 characters long",
    })
  }

  db.user
    .findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: "User already exists" })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({ message: "Something went wrong 1" })
    })

  //hash password and save user to db
  const password = req.body.password
  const firstname = req.body.firstname
  const lastname = req.body.lastname

  const hashedPassword = bcrypt.hashSync(password, await bcrypt.genSalt(10))

  db.user
    .create({
      data: {
        email: email,
        password: hashedPassword,
        firstname: firstname,
        emailVerified: null,
        lastname: lastname,
      },
    })
    .then((user) => {
      res.status(200).json({ message: "User created successfully" })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({ message: "Something went wrong 2" })
    })
}
