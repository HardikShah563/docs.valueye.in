import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, FileText, Sparkles, Layers, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // Assuming you have this, if not, standard div works
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import docsData from "@/data/docs.json"
import type { DocsData } from "@/types/docs"

const data = docsData as DocsData

export function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full space-y-12 pb-20">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 via-secondary/5 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-primary/10 blur-[100px] rounded-full opacity-50" />
        <div className="absolute left-0 top-20 h-[300px] w-[300px] bg-secondary/10 blur-[80px] rounded-full opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-10 md:pt-16 lg:pt-20">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto px-4">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="font-medium">Documentation & Resources</span>
            </div>

            <img
              src="/logo.svg"
              alt="Platform Logo"
              className="h-12 w-auto mx-auto mb-8 drop-shadow-sm"
            />

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Build better with <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Developments & Modules
              </span>
            </h1>
          </div>

          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-5 delay-150 duration-700">
            Your comprehensive guide to our ecosystem. Explore detailed guides,
            API references, and modular components designed to help you scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 delay-300 duration-700">
            <Button size="lg" className="h-12 px-12 rounded-full shadow-lg shadow-primary/20" asChild>
              <Link to="/docs/erp-overview">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 rounded-full bg-background/50 backdrop-blur-sm" asChild>
              <Link to="/docs/changelog">
                View Changelog
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Browse Modules</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.sections.map((section, _idx) => (
            <Card
              key={section.id}
              className="group relative overflow-hidden border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                <FileText className="h-24 w-24 text-primary rotate-12 -mr-8 -mt-8" />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                    {section.modules.length} modules
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {section.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-1">
                  {section.modules.slice(0, 5).map((module) => (
                    <Link
                      key={module.id}
                      to={`/docs/${module.id}`}
                      className="group/link flex items-center justify-between rounded-md p-2 text-sm text-muted-foreground transition-all hover:bg-primary/5 hover:text-foreground hover:pl-3"
                    >
                      <span className="truncate">{module.title}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-primary" />
                    </Link>
                  ))}
                  {section.modules.length > 5 && (
                    <div className="mt-2 text-xs text-muted-foreground pl-2 italic">
                      + {section.modules.length - 5} more...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12">
          {/* Abstract Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Need help finding something?</h3>
              <p className="text-muted-foreground max-w-md">
                Our support team is always ready to assist you with specific module integration or custom development needs.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="bg-background shadow-sm hover:bg-background/80" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild>
                <Link to="/docs/erp-overview" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}