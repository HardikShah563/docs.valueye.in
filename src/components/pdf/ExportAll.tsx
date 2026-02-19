import { useCallback, useState } from "react"
import { Download } from "lucide-react"
import html2pdf from "html2pdf.js"
import { PDFDocument } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { DocsData } from "@/types/docs"
import { flattenModules } from "@/types/docs"

interface ExportAllProps {
  data: DocsData
  variant?: "default" | "ghost" | "outline" | "secondary" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon" | "xs" | "icon-sm" | "icon-lg" | "icon-xs"
  className?: string
}

export function ExportAll({
  data,
  variant,
  // size,
  className,
}: ExportAllProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = useCallback(async () => {
    setLoading(true)
    try {
      const modules = flattenModules(data)
      const pdfBlobs: ArrayBuffer[] = []

      for (const module of modules) {
        const tempDiv = document.createElement("div")
        tempDiv.className = "prose prose-neutral max-w-none p-8 bg-white text-black"
        tempDiv.style.width = "210mm"
        tempDiv.style.minHeight = "297mm"
        tempDiv.innerHTML = module.html
        tempDiv.style.position = "absolute"
        tempDiv.style.left = "-9999px"
        tempDiv.style.top = "0"
        document.body.appendChild(tempDiv)

        const blob = await html2pdf()
          .set({
            margin: 10,
            filename: "",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(tempDiv)
          .outputPdf("arraybuffer")

        document.body.removeChild(tempDiv)
        pdfBlobs.push(blob as ArrayBuffer)
      }

      const mergedPdf = await PDFDocument.create()
      for (const blob of pdfBlobs) {
        const src = await PDFDocument.load(blob)
        const pages = await mergedPdf.copyPages(src, src.getPageIndices())
        pages.forEach((p) => mergedPdf.addPage(p))
      }
      const bytes = await mergedPdf.save()
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" })
      const downloadUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = "Valueye-Documentation.pdf"
      a.click()
      URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("PDF export failed:", err)
    } finally {
      setLoading(false)
    }
  }, [data])

  return (
    <Button
      variant={variant ?? "outline"}
      // size={size ?? "sm"}
      onClick={handleExport}
      disabled={loading}
      className={cn("gap-2", className)}
    >
      <Download className="h-4 w-4" />
      {loading ? "Generating…" : "Download All"}
    </Button>
  )
}
