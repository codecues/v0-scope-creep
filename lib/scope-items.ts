import type { ScopeItem } from "@/types/scope-item"
import { getProject, updateProject } from "./projects"

export async function getScopeItems(projectId: string): Promise<ScopeItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const project = await getProject(projectId)
  return project?.scopeItems || []
}

export async function getScopeItem(id: string): Promise<ScopeItem | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Find the project containing this scope item
  const projects = await import("./projects").then((m) => m.getProjects())

  for (const project of projects) {
    const item = project.scopeItems.find((item) => item.id === id)
    if (item) return item
  }

  return undefined
}

interface AddScopeItemData {
  projectId: string
  title: string
  description?: string
  isOriginalScope: boolean
  dateAdded: string
  estimatedHours?: number
  completed: boolean
}

export async function addScopeItem(data: AddScopeItemData): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const project = await getProject(data.projectId)
  if (!project) throw new Error("Project not found")

  const newItem: ScopeItem = {
    id: Date.now().toString(),
    title: data.title,
    description: data.description || "",
    isOriginalScope: data.isOriginalScope,
    dateAdded: data.dateAdded,
    estimatedHours: data.estimatedHours,
    completed: data.completed,
  }

  const updatedScopeItems = [...project.scopeItems, newItem]

  await updateProject(data.projectId, {
    scopeItems: updatedScopeItems,
  })

  // Add to activity log
  const activityModule = await import("./activity")
  await activityModule.addActivity({
    type: "add",
    projectId: data.projectId,
    projectName: project.name,
    scopeItemTitle: data.title,
    isOriginalScope: data.isOriginalScope,
  })

  return newItem.id
}

export async function updateScopeItem(id: string, data: Partial<ScopeItem>): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Find the project containing this scope item
  const projects = await import("./projects").then((m) => m.getProjects())

  for (const project of projects) {
    const itemIndex = project.scopeItems.findIndex((item) => item.id === id)

    if (itemIndex !== -1) {
      const updatedItem = { ...project.scopeItems[itemIndex], ...data }
      const updatedItems = [...project.scopeItems]
      updatedItems[itemIndex] = updatedItem

      await updateProject(project.id, {
        scopeItems: updatedItems,
      })

      // If the item was marked as completed, add to activity log
      if (data.completed === true && !project.scopeItems[itemIndex].completed) {
        const activityModule = await import("./activity")
        await activityModule.addActivity({
          type: "complete",
          projectId: project.id,
          projectName: project.name,
          scopeItemTitle: updatedItem.title,
          isOriginalScope: updatedItem.isOriginalScope,
        })
      }

      return
    }
  }

  throw new Error("Scope item not found")
}

export async function deleteScopeItem(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Find the project containing this scope item
  const projects = await import("./projects").then((m) => m.getProjects())

  for (const project of projects) {
    const itemIndex = project.scopeItems.findIndex((item) => item.id === id)

    if (itemIndex !== -1) {
      const updatedItems = project.scopeItems.filter((item) => item.id !== id)

      await updateProject(project.id, {
        scopeItems: updatedItems,
      })

      return
    }
  }

  throw new Error("Scope item not found")
}
