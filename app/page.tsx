import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectList } from "@/components/project-list"
import { ScopeCreepChart } from "@/components/scope-creep-chart"
import { RecentActivity } from "@/components/recent-activity"

export const metadata: Metadata = {
  title: "Scope Creep Tracker",
  description: "Track and visualize scope creep in your projects",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scope Creep Tracker</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track and visualize how your project requirements grow over time
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/projects/new">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Your Projects</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Manage your projects and track scope changes over time
                </p>
                <ProjectList />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest scope changes across your projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Scope Creep Overview</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Visualize how scope has grown across all your projects
                </p>
              </div>
              <div className="flex justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Scope Growth</CardTitle>
                    <CardDescription>Cumulative scope items over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScopeCreepChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
