import { useParams, Link } from "react-router-dom"
import DOMPurify from "dompurify"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import docsData from "@/data/docs.json"
import type { DocsData } from "@/types/docs"
import { getModuleById, getSectionForModule } from "@/types/docs"

const data = docsData as DocsData

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function addHeadingIds(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const headings = doc.querySelectorAll("h1, h2, h3, h4")

  headings.forEach((h) => {
    if (!h.id && h.textContent) {
      h.id = slugify(h.textContent)
    }
  })

  return doc.body.innerHTML
}

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  if (!slug) return null

  const module = getModuleById(data, slug)
  const section = module ? getSectionForModule(data, slug) : undefined

  if (!module) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Module not found.</p>
        <Button variant="outline" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  const safeHtml = addHeadingIds(DOMPurify.sanitize(module.html))

  return (
    <article className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link to="/" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <span>/</span>
        {section && (
          <>
            <span>{section.title}</span>
            <span>/</span>
          </>
        )}
        <span className="text-foreground font-medium">{module.title}</span>
      </nav>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </article>
  )
}
