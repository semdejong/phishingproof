"use client"

import React from "react"

import { Input } from "./input"
import { toast } from "./use-toast"

function PatchArea({
  editing,
  placeholder,
  currentText,
  apiUrl,
  bodyfield,
  cb,
}) {
  const [newText, setNewText] = React.useState(currentText)

  const handleSave = async () => {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [bodyfield]: newText }),
    })

    if (response.ok) {
      cb(newText)
    } else {
      const err = await response.json()
      toast({
        title: "Failed to update",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  return editing ? (
    <Input
      onBlur={handleSave}
      className=""
      placeholder={placeholder}
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
    ></Input>
  ) : (
    currentText
  )
}

export default PatchArea
