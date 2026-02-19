import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import docsData from "@/data/docs.json"
import type { DocsData } from "@/types/docs"

const data = docsData as DocsData

export function WelcomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-sm ring-1 ring-primary/5">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Welcome to Valueye Docs
            </h1>
            <p className="mt-1.5 text-muted-foreground">
              Everything you need to build with our platform
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Browse our documentation by section below. Each module includes detailed guides,
          API references, and best practices to help you succeed.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Documentation Sections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.sections.map((section) => (
            <Card
              key={section.id}
              className="group border-border/80 bg-card/50 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  {section.title}
                </CardTitle>
                <CardDescription>
                  {section.modules.length} module{section.modules.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.modules.map((module) => (
                  <Link
                    key={module.id}
                    to={`/docs/${module.id}`}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {module.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted/30 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">Ready to dive in?</h3>
            <p className="text-sm text-muted-foreground">
              Start with the Overview or jump to a specific module.
            </p>
          </div>
          <Button asChild>
            <Link to="/docs/overview" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
