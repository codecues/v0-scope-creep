"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { ScopeItem } from "@/types/scope-item"
import { getScopeItems, updateScopeItem } from "@/lib/scope-items"

interface ScopeItemListProps {
  projectId: string
  filter: "all" | "original" | "added"
}

export function ScopeItemList({ projectId, filter }: ScopeItemListProps) {
  const [items, setItems] = useState<ScopeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getScopeItems(projectId)
        let filteredItems = data

        if (filter === "original") {
          filteredItems = data.filter((item) => item.isOriginalScope)
        } else if (filter === "added") {
          filteredItems = data.filter((item) => !item.isOriginalScope)
        }

        setItems(filteredItems)
      } catch (error) {
        console.error("Failed to fetch scope items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [projectId, filter])

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateScopeItem(id, { completed })
      setItems(items.map((item) => (item.id === id ? { ...item, completed } : item)))
    } catch (error) {
      console.error("Failed to update scope item:", error)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading scope items...</div>
  }

  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <p className="mb-4 text-muted-foreground">
          {filter === "all"
            ? "No scope items yet"
            : filter === "original"
              ? "No original scope items"
              : "No added scope items"}
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className={item.completed ? "opacity-60" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) => handleToggleComplete(item.id, checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <CardTitle className={item.completed ? "line-through" : ""}>{item.title}</CardTitle>
                  <CardDescription className="mt-1">{item.description}</CardDescription>
                </div>
              </div>
              <Badge variant={item.isOriginalScope ? "default" : "secondary"}>
                {item.isOriginalScope ? "Original" : "Added"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Added on {new Date(item.dateAdded).toLocaleDateString()}
              </div>
              {item.estimatedHours && <div>Est. {item.estimatedHours} hours</div>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
