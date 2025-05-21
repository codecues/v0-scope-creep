"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getAllScopeData } from "@/lib/analytics"

interface ScopeDataPoint {
  date: string
  originalScope: number
  addedScope: number
  total: number
}

export function ScopeCreepChart() {
  const [data, setData] = useState<ScopeDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getAllScopeData()
        setData(chartData)
      } catch (error) {
        console.error("Failed to fetch scope data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart data...</div>
  }

  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data available</div>
  }

  return (
    <ChartContainer
      config={{
        total: {
          label: "Total Scope",
          color: "hsl(var(--chart-1))",
        },
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
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} name="Total Scope" />
          <Line type="monotone" dataKey="originalScope" stroke="var(--color-originalScope)" name="Original Scope" />
          <Line type="monotone" dataKey="addedScope" stroke="var(--color-addedScope)" name="Added Scope" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
