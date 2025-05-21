"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addScopeItem } from "@/lib/scope-items"

interface AddScopeItemDialogProps {
  projectId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddScopeItemDialog({ projectId, open, onOpenChange }: AddScopeItemDialogProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [isOriginalScope, setIsOriginalScope] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const estimatedHours = formData.get("estimatedHours") as string

    try {
      await addScopeItem({
        projectId,
        title,
        description,
        isOriginalScope,
        dateAdded: date.toISOString(),
        estimatedHours: estimatedHours ? Number.parseFloat(estimatedHours) : undefined,
        completed: false,
      })

      onOpenChange(false)
      // Reset form
      setIsOriginalScope(false)
      setDate(new Date())
    } catch (error) {
      console.error("Failed to add scope item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Scope Item</DialogTitle>
            <DialogDescription>Add a new scope item to your project</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter scope item title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the scope item" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                name="estimatedHours"
                type="number"
                min="0"
                step="0.5"
                placeholder="Enter estimated hours"
              />
            </div>
            <div className="grid gap-2">
              <Label>Date Added</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="isOriginalScope" checked={isOriginalScope} onCheckedChange={setIsOriginalScope} />
              <Label htmlFor="isOriginalScope">Part of original scope</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
