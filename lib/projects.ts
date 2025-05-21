import type { Project } from "@/types/project"

// Mock data storage
let projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign the company website with new branding",
    startDate: "2023-10-15T00:00:00.000Z",
    scopeItems: [
      {
        id: "101",
        title: "Homepage design",
        description: "Create new homepage design with hero section",
        isOriginalScope: true,
        dateAdded: "2023-10-15T00:00:00.000Z",
        estimatedHours: 8,
        completed: true,
      },
      {
        id: "102",
        title: "About page",
        description: "Create about page with team section",
        isOriginalScope: true,
        dateAdded: "2023-10-15T00:00:00.000Z",
        estimatedHours: 4,
        completed: false,
      },
      {
        id: "103",
        title: "Blog integration",
        description: "Add blog functionality with CMS",
        isOriginalScope: false,
        dateAdded: "2023-11-05T00:00:00.000Z",
        estimatedHours: 16,
        completed: false,
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Develop a new mobile app for customer engagement",
    startDate: "2023-09-01T00:00:00.000Z",
    scopeItems: [
      {
        id: "201",
        title: "User authentication",
        description: "Implement login and registration",
        isOriginalScope: true,
        dateAdded: "2023-09-01T00:00:00.000Z",
        estimatedHours: 12,
        completed: true,
      },
      {
        id: "202",
        title: "Product catalog",
        description: "Display products with filtering",
        isOriginalScope: true,
        dateAdded: "2023-09-01T00:00:00.000Z",
        estimatedHours: 20,
        completed: true,
      },
      {
        id: "203",
        title: "Push notifications",
        description: "Implement push notifications for offers",
        isOriginalScope: false,
        dateAdded: "2023-10-10T00:00:00.000Z",
        estimatedHours: 8,
        completed: false,
      },
      {
        id: "204",
        title: "Social sharing",
        description: "Add ability to share products on social media",
        isOriginalScope: false,
        dateAdded: "2023-11-15T00:00:00.000Z",
        estimatedHours: 6,
        completed: false,
      },
    ],
  },
]

export async function getProjects(): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return projects
}

export async function getProject(id: string): Promise<Project | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return projects.find((project) => project.id === id)
}

interface CreateProjectData {
  name: string
  description?: string
  startDate: string
}

export async function createProject(data: CreateProjectData): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newProject: Project = {
    id: Date.now().toString(),
    name: data.name,
    description: data.description || "",
    startDate: data.startDate,
    scopeItems: [],
  }

  projects = [...projects, newProject]
  return newProject.id
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  projects = projects.map((project) => (project.id === id ? { ...project, ...data } : project))
}

export async function deleteProject(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  projects = projects.filter((project) => project.id !== id)
}
