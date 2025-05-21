"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getProjectScopeData } from "@/lib/analytics"

interface ScopeDataPoint {
  date: string
  originalScope: number
  addedScope: number
}

interface ProjectScopeChartProps {
  projectId: string
}

export function ProjectScopeChart({ projectId }: ProjectScopeChartProps) {
  const [data, setData] = useState<ScopeDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getProjectScopeData(projectId)
        setData(chartData)
      } catch (error) {
        console.error("Failed to fetch project scope data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart data...</div>
  }

  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data available</div>
  }

  return (
    <ChartContainer
      config={{
        originalScope: {
          label: "Original Scope",
          color: "hsl(var(--chart-2))",
        },
        addedScope: {
          label: "Added Scope",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="originalScope" fill="var(--color-originalScope)" name="Original Scope" stackId="a" />
          <Bar dataKey="addedScope" fill="var(--color-addedScope)" name="Added Scope" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
