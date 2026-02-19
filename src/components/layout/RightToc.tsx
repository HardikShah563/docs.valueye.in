import { useCallback } from "react"
import type { TocItem } from "@/hooks/useScrollSpy"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RightTocProps {
  headings: TocItem[]
  activeId: string
  className?: string
}

export function RightToc({ headings, activeId, className }: RightTocProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  if (headings.length === 0) return null

  return (
    <aside
      className={cn(
        "no-print hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] w-[220px] shrink-0 border-l border-border py-6",
        className
      )}
    >
      <div className="px-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-1">
            {headings.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block truncate text-sm transition-colors hover:text-foreground",
                  item.level === 2 && "pl-0",
                  item.level === 3 && "pl-3",
                  item.level === 4 && "pl-6",
                  activeId === item.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  )
}
