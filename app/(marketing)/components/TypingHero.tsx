"use client"

import { ReactTyped } from "react-typed"

import { Icons } from "@/components/icons"

export default function TypingHero() {
  return (
    <span className="text-red-500">
      <ReactTyped
        strings={["Proof", "Aware", "Smart", "Secure"]}
        typeSpeed={170}
        backDelay={1700}
        backSpeed={100}
        loop
      />
    </span>
  )
}
