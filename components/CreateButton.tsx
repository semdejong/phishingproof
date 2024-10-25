import React from 'react'
import { Button } from './ui/button'
interface CreateButtonProps {
    variant: string;
}
export default async function CreateButton(variant: CreateButtonProps) {
    //post creation fetch based on variant
    const res = await fetch(`/api/${variant}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
    })
  return (
    <Button>
        Create
    </Button>
  )
}
