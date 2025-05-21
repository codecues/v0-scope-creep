"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronRightIcon } from "lucide-react"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"
import { getProjects } from "@/lib/projects"

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Loading projects...</div>
  }

  if (projects.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <p className="mb-4 text-muted-foreground">No projects yet</p>
        <Link href="/projects/new">
          <Button>Create your first project</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="mt-1">{project.description}</CardDescription>
                </div>
                <Badge variant="outline" className="ml-2">
                  {project.scopeItems.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                Started {new Date(project.startDate).toLocaleDateString()}
              </div>
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
