import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "./Sidebar"
import type { DocsData } from "@/types/docs"
import { ExportAll } from "@/components/pdf/ExportAll"
import { ExportSingle } from "@/components/pdf/ExportSingle"

interface HeaderProps {
  data: DocsData
  sidebarOpen: boolean
  onSidebarOpenChange: (open: boolean) => void
  currentModuleId?: string
  currentModuleTitle?: string
}

export function Header({
  data,
  sidebarOpen,
  onSidebarOpenChange,
  currentModuleId,
  currentModuleTitle,
}: HeaderProps) {
  return (
    <header className="no-print sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sidebar
        data={data}
        variant="sheet"
        open={sidebarOpen}
        onOpenChange={onSidebarOpenChange}
      />
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold text-foreground no-underline hover:opacity-80"
      >
        <BookOpen className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">Developments & Modules</span>
      </Link>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        {currentModuleId && currentModuleTitle && (
          <ExportSingle
            moduleId={currentModuleId}
            moduleTitle={currentModuleTitle}
            variant="ghost"
            size="icon"
          />
        )}
        <ExportAll data={data} variant="outline" size="sm" />
        <ThemeToggle />
      </div>
    </header>
  )
}
