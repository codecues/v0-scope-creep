import type { ScopeItem } from "./scope-item"

export interface Project {
  id: string
  name: string
  description: string
  startDate: string
  scopeItems: ScopeItem[]
}
