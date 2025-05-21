"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { CalendarIcon, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScopeItemList } from "@/components/scope-item-list"
import { ProjectScopeChart } from "@/components/project-scope-chart"
import { AddScopeItemDialog } from "@/components/add-scope-item-dialog"
import { useProject } from "@/hooks/use-project"

export default function ProjectPage() {
  const { id } = useParams()
  const { project, isLoading } = useProject(id as string)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">Project not found</div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>Started on {new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Scope Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="original">Original Scope</TabsTrigger>
              <TabsTrigger value="added">Added Scope</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScopeItemList projectId={id as string} filter="all" />
            </TabsContent>
            <TabsContent value="original">
              <ScopeItemList projectId={id as string} filter="original" />
            </TabsContent>
            <TabsContent value="added">
              <ScopeItemList projectId={id as string} filter="added" />
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Scope Growth</CardTitle>
              <CardDescription>Visualize scope changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectScopeChart projectId={id as string} />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddScopeItemDialog projectId={id as string} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
