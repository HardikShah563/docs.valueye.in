import { Link, useLocation } from "react-router-dom"
import { BookOpen, ChevronDown, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DocsData, DocSection } from "@/types/docs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface SidebarProps {
  data: DocsData
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "sidebar" | "sheet"
}

export function Sidebar({
  data,
  open,
  onOpenChange,
  variant = "sidebar",
}: SidebarProps) {
  const location = useLocation()

  const content = (
    <nav className="space-y-1">
      {data.sections.map((section) => (
        <SectionNav
          key={section.id}
          section={section}
          currentPath={location.pathname}
          onLinkClick={() => onOpenChange?.(false)}
        />
      ))}
    </nav>
  )

  if (variant === "sheet") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden shrink-0"
            aria-label="Open menu"
          >
            <BookOpen className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle className="text-left font-semibold">Documentation</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-65px)]">
            <div className="p-3">{content}</div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside className="no-print sticky top-0 hidden h-screen w-[260px] min-w-[260px] shrink-0 flex-col border-r border-border bg-muted/30 lg:flex">
      <ScrollArea className="flex-1">
        <div className="p-3">{content}</div>
      </ScrollArea>
    </aside>
  )
}

function SectionNav({
  section,
  currentPath,
  onLinkClick,
}: {
  section: DocSection
  currentPath: string
  onLinkClick?: () => void
}) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {section.title}
        </span>
      </div>
      {section.modules.map((module) => {
        const to = `/docs/${module.id}`
        const active = currentPath === to
        return (
          <Link
            key={module.id}
            to={to}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={onLinkClick}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 -rotate-90",
                active && "text-primary-foreground"
              )}
            />
            {module.title}
          </Link>
        )
      })}
    </div>
  )
}
