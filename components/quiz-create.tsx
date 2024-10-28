"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Categories } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface QuizCreateButtonProps extends ButtonProps {
  categories: Categories[]
}

export function QuizCreateButton({
  className,
  variant,
  categories,
  ...props
}: QuizCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [quizName, setQuizName] = React.useState<string>("")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [open, setOpen] = React.useState(false)

  async function onSave() {
    if (!quizName) {
      return toast({
        title: "Please enter a quiz name.",
        variant: "destructive",
      })
    }
    if (selectedCategories.length === 0) {
      return toast({
        title: "Please select at least one category.",
        variant: "destructive",
      })
    }
    console.log(selectedCategories);
    setIsLoading(true)

    const response = await fetch("/api/quizzes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: quizName,
        categories: selectedCategories,
      }),
    })

    setIsLoading(false)

    if (!response.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 categories reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      const error = await response.json()

      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      })
    }

    router.refresh()

    const quiz = await response.json()
    toast({
      title: "Quiz created successfully!",
    })

    router.refresh()
    // router.push(`/editor/${post.id}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            buttonVariants({ variant }),
            { "cursor-not-allowed opacity-60": isLoading },
            className
          )}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          New Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription>
            Enter a name for your new quiz and link it to categories.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quiz-name" className="text-right">
              Quiz Name
            </Label>
            <Input
              id="quiz-name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Categories</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="col-span-3 justify-between"
                >
                  {selectedCategories.length > 0
                    ? `${selectedCategories.length} selected`
                    : "Select categories"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        onSelect={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(category.id)
                              ? prev.filter((id) => id !== category.id)
                              : [...prev, category.id]
                          )
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCategories.includes(category.id) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary">
                    {category?.name}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))}
                    >
                      ×
                    </button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave} disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}