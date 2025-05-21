"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle, CheckCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { getRecentActivity } from "@/lib/activity"

interface ActivityItem {
  id: string
  type: "add" | "complete"
  projectId: string
  projectName: string
  scopeItemTitle: string
  timestamp: string
  isOriginalScope: boolean
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getRecentActivity()
        setActivities(data)
      } catch (error) {
        console.error("Failed to fetch recent activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (isLoading) {
    return <div className="text-center py-4">Loading activities...</div>
  }

  if (activities.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No recent activity</div>
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
          <div className="mt-0.5">
            {activity.type === "add" ? (
              <PlusCircle className="h-5 w-5 text-primary" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.type === "add" ? "Added" : "Completed"}{" "}
              <span className="font-semibold">{activity.scopeItemTitle}</span>
            </p>
            <div className="flex items-center gap-2">
              <Link href={`/projects/${activity.projectId}`} className="text-xs text-blue-500 hover:underline">
                {activity.projectName}
              </Link>
              <Badge variant={activity.isOriginalScope ? "default" : "secondary"} className="text-[10px] px-1 py-0">
                {activity.isOriginalScope ? "Original" : "Added"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
