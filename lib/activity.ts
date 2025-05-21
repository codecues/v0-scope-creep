interface ActivityItem {
  id: string
  type: "add" | "complete"
  projectId: string
  projectName: string
  scopeItemTitle: string
  timestamp: string
  isOriginalScope: boolean
}

// Mock data storage
let activities: ActivityItem[] = [
  {
    id: "1",
    type: "add",
    projectId: "1",
    projectName: "Website Redesign",
    scopeItemTitle: "Blog integration",
    timestamp: "2023-11-05T10:30:00.000Z",
    isOriginalScope: false,
  },
  {
    id: "2",
    type: "complete",
    projectId: "1",
    projectName: "Website Redesign",
    scopeItemTitle: "Homepage design",
    timestamp: "2023-11-10T14:45:00.000Z",
    isOriginalScope: true,
  },
  {
    id: "3",
    type: "add",
    projectId: "2",
    projectName: "Mobile App Development",
    scopeItemTitle: "Social sharing",
    timestamp: "2023-11-15T09:15:00.000Z",
    isOriginalScope: false,
  },
]

export async function getRecentActivity(limit = 10): Promise<ActivityItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Sort by timestamp (newest first) and limit
  return [...activities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

interface AddActivityData {
  type: "add" | "complete"
  projectId: string
  projectName: string
  scopeItemTitle: string
  isOriginalScope: boolean
}

export async function addActivity(data: AddActivityData): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const newActivity: ActivityItem = {
    id: Date.now().toString(),
    ...data,
    timestamp: new Date().toISOString(),
  }

  activities = [newActivity, ...activities]
  return newActivity.id
}
