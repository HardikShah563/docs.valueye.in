import { useCallback } from "react"
import { FileDown } from "lucide-react"
import html2pdf from "html2pdf.js"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExportSingleProps {
  moduleId: string
  moduleTitle: string
  variant?: "default" | "ghost" | "outline" | "secondary" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon" | "xs" | "icon-sm" | "icon-lg" | "icon-xs"
  className?: string
}

export function ExportSingle({
  moduleId,
  moduleTitle,
  variant,
  size,
  className,
}: ExportSingleProps) {
  const printAreaId = `print-area-${moduleId}`

  const handleExport = useCallback(async () => {
    const el = document.getElementById(printAreaId)
    if (!el) return

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${moduleTitle.replace(/\s+/g, "-")}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
    }
    await html2pdf().set(opt).from(el).save()
  }, [printAreaId, moduleTitle])

  return (
    <Button
      variant={variant ?? "ghost"}
      size={size ?? "icon"}
      onClick={handleExport}
      className={cn(className)}
      aria-label={`Download ${moduleTitle} as PDF`}
    >
      <FileDown className="h-4 w-4" />
    </Button>
  )
}

export function getPrintAreaId(moduleId: string) {
  return `print-area-${moduleId}`
}
