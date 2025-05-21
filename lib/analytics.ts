import { getProjects } from "./projects"
import type { ScopeItem } from "@/types/scope-item"

interface ScopeDataPoint {
  date: string
  originalScope: number
  addedScope: number
  total: number
}

interface ProjectScopeDataPoint {
  date: string
  originalScope: number
  addedScope: number
}

// Helper function to group items by date
function groupItemsByDate(items: ScopeItem[]): Record<string, ScopeItem[]> {
  const grouped: Record<string, ScopeItem[]> = {}

  items.forEach((item) => {
    // Format date to YYYY-MM-DD to group by day
    const date = new Date(item.dateAdded).toISOString().split("T")[0]

    if (!grouped[date]) {
      grouped[date] = []
    }

    grouped[date].push(item)
  })

  return grouped
}

export async function getAllScopeData(): Promise<ScopeDataPoint[]> {
  const projects = await getProjects()

  // Collect all scope items from all projects
  const allItems: ScopeItem[] = []
  projects.forEach((project) => {
    allItems.push(...project.scopeItems)
  })

  // Group items by date
  const groupedByDate = groupItemsByDate(allItems)

  // Sort dates
  const sortedDates = Object.keys(groupedByDate).sort()

  // Calculate cumulative counts
  let cumulativeOriginal = 0
  let cumulativeAdded = 0

  return sortedDates.map((date) => {
    const items = groupedByDate[date]
    const originalItems = items.filter((item) => item.isOriginalScope)
    const addedItems = items.filter((item) => !item.isOriginalScope)

    cumulativeOriginal += originalItems.length
    cumulativeAdded += addedItems.length

    return {
      date,
      originalScope: cumulativeOriginal,
      addedScope: cumulativeAdded,
      total: cumulativeOriginal + cumulativeAdded,
    }
  })
}

export async function getProjectScopeData(projectId: string): Promise<ProjectScopeDataPoint[]> {
  const projects = await getProjects()
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return []
  }

  // Group items by date
  const groupedByDate = groupItemsByDate(project.scopeItems)

  // Sort dates
  const sortedDates = Object.keys(groupedByDate).sort()

  // Calculate counts for each date
  let cumulativeOriginal = 0
  let cumulativeAdded = 0

  return sortedDates.map((date) => {
    const items = groupedByDate[date]
    const originalItems = items.filter((item) => item.isOriginalScope)
    const addedItems = items.filter((item) => !item.isOriginalScope)

    cumulativeOriginal += originalItems.length
    cumulativeAdded += addedItems.length

    return {
      date,
      originalScope: cumulativeOriginal,
      addedScope: cumulativeAdded,
    }
  })
}

export async function getScopeCreepPercentage(projectId: string): Promise<number> {
  const projects = await getProjects()
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return 0
  }

  const originalItems = project.scopeItems.filter((item) => item.isOriginalScope)
  const addedItems = project.scopeItems.filter((item) => !item.isOriginalScope)

  if (originalItems.length === 0) {
    return 0
  }

  return (addedItems.length / originalItems.length) * 100
}

export async function getCompletionPercentage(projectId: string): Promise<number> {
  const projects = await getProjects()
  const project = projects.find((p) => p.id === projectId)

  if (!project || project.scopeItems.length === 0) {
    return 0
  }

  const completedItems = project.scopeItems.filter((item) => item.completed)

  return (completedItems.length / project.scopeItems.length) * 100
}
