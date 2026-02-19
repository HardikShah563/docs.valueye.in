import { Link } from "react-router-dom"
import { Download, FileDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "./Sidebar"
import type { DocsData } from "@/types/docs"
import { useExportSingle } from "@/hooks/useExportPdf"
import { useExportAll } from "@/hooks/useExportPdf"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface HeaderProps {
  data: DocsData
  sidebarOpen: boolean
  onSidebarOpenChange: (open: boolean) => void
  currentModuleId?: string
  currentModuleTitle?: string
  currentModuleHtml?: string
}

export function Header({
  data,
  sidebarOpen,
  onSidebarOpenChange,
  currentModuleTitle,
  currentModuleHtml,
}: HeaderProps) {
  const { exportSingle, loading: singleLoading } = useExportSingle(
    currentModuleTitle ?? "",
    currentModuleHtml ?? ""
  )
  const { exportAll, loading: allLoading } = useExportAll(data)
  const canExportSingle = Boolean(currentModuleTitle && currentModuleHtml)

  return (
    <header className="no-print sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        <img src="/logo.svg" alt="Valueye Logo" className="h-8 w-8 shrink-0" />
        <span className="hidden sm:inline text-lg font-semibold">Developments & Modules</span>
      </Link>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download PDF</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Download PDF</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="min-w-[180px]">
            {canExportSingle && (
              <>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                    exportSingle()
                  }}
                  disabled={singleLoading}
                >
                  <FileDown className="h-4 w-4" />
                  {singleLoading ? "Generating…" : "This page"}
                </DropdownMenuItem>
                <Separator />
              </>
            )}
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                exportAll()
              }}
              disabled={allLoading}
            >
              <Download className="h-4 w-4" />
              {allLoading ? "Generating…" : "All documentation"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-0.5 h-5" />
        <ThemeToggle />
      </div>
    </header>
  )
}
