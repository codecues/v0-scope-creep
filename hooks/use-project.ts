"use client"

import { useEffect, useState } from "react"
import type { Project } from "@/types/project"
import { getProject } from "@/lib/projects"

export function useProject(id: string) {
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        const data = await getProject(id)
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch project"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [id])

  return { project, isLoading, error }
}
