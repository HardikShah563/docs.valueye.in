import { useCallback, useState } from "react"
import { FileDown } from "lucide-react"
import html2pdf from "html2pdf.js"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExportSingleProps {
  moduleTitle: string
  html: string
  variant?: "default" | "ghost" | "outline" | "secondary" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon" | "xs" | "icon-sm" | "icon-lg" | "icon-xs"
  className?: string
}

export function ExportSingle({
  moduleTitle,
  html,
  variant,
  // size,
  className,
}: ExportSingleProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = useCallback(async () => {
    setLoading(true)
    const container = document.createElement("div")
    container.className = "prose prose-neutral max-w-none p-8 bg-white text-black"
    container.dataset.pdfExport = "temp"
    container.style.cssText = "position:fixed;left:0;top:0;width:210mm;min-height:297mm;z-index:-1;opacity:0;pointer-events:none;"
    container.innerHTML = html
    document.body.appendChild(container)
    try {
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${moduleTitle.replace(/\s+/g, "-")}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
      }
      await html2pdf().set(opt).from(container).save()
    } catch (err) {
      console.error("PDF export failed:", err)
    } finally {
      container.remove()
      setLoading(false)
    }
  }, [moduleTitle, html])

  return (
    <Button
      variant={variant ?? "ghost"}
      onClick={handleExport}
      disabled={loading}
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
