"use client"

import { ReactTyped } from "react-typed"

export default function TypingSlogan() {
  return (
    <span className="text-red-500">
      <ReactTyped
        strings={[
          "Spot the Phish, Secure Your Business!",
          "Stay a Step Ahead: Learn to Outsmart Phishing!",
          "PhishingProof: Your First Line of Defense Against Cyber Threats!",
          "Click Smart, Stay Safe: Master Phishing Prevention!",
          "Don’t Get Hooked! Become Phishing-Proof Today!",
        ]}
        typeSpeed={85}
        backDelay={1700}
        backSpeed={42}
        loop
      />
    </span>
  )
}
