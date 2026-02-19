import { useCallback, useState } from "react"
import html2pdf from "html2pdf.js"
import { PDFDocument } from "pdf-lib"
import DOMPurify from "dompurify"
import type { DocsData } from "@/types/docs"
import { flattenModules } from "@/types/docs"

function addHeadingIds(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const headings = doc.querySelectorAll("h1, h2, h3, h4")
  headings.forEach((h) => {
    if (!h.id && h.textContent) {
      h.id = h.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()
    }
  })
  return doc.body.innerHTML
}

export function useExportSingle(moduleTitle: string, html: string) {
  const [loading, setLoading] = useState(false)

  const exportSingle = useCallback(async () => {
    setLoading(true)
    const safeHtml = addHeadingIds(DOMPurify.sanitize(html))
    const container = document.createElement("div")
    container.className = "prose prose-neutral max-w-none p-8 bg-white text-black"
    container.style.cssText =
      "position:fixed;left:0;top:0;width:210mm;min-height:297mm;z-index:-1;opacity:0;pointer-events:none;"
    container.innerHTML = safeHtml
    document.body.appendChild(container)
    try {
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10] as [number, number, number, number],
          filename: `${moduleTitle.replace(/\s+/g, "-")}.pdf`,
          image: { type: "jpeg" as const, quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
        })
        .from(container)
        .save()
    } catch (err) {
      console.error("PDF export failed:", err)
    } finally {
      container.remove()
      setLoading(false)
    }
  }, [moduleTitle, html])

  return { exportSingle, loading }
}

export function useExportAll(data: DocsData) {
  const [loading, setLoading] = useState(false)

  const exportAll = useCallback(async () => {
    setLoading(true)
    try {
      const modules = flattenModules(data)
      const pdfBlobs: ArrayBuffer[] = []

      for (const module of modules) {
        const tempDiv = document.createElement("div")
        tempDiv.className = "prose prose-neutral max-w-none p-8 bg-white text-black"
        tempDiv.style.cssText =
          "position:fixed;left:0;top:0;width:210mm;min-height:297mm;z-index:-1;opacity:0;pointer-events:none;"
        tempDiv.innerHTML = DOMPurify.sanitize(module.html)
        document.body.appendChild(tempDiv)

        const blob = (await html2pdf()
          .set({
            margin: 10,
            filename: "",
            image: { type: "jpeg" as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
          })
          .from(tempDiv)
          .outputPdf("arraybuffer")) as ArrayBuffer

        tempDiv.remove()
        pdfBlobs.push(blob)
      }

      const mergedPdf = await PDFDocument.create()
      for (const blob of pdfBlobs) {
        const src = await PDFDocument.load(blob)
        const pages = await mergedPdf.copyPages(src, src.getPageIndices())
        pages.forEach((p) => mergedPdf.addPage(p))
      }
      const bytes = await mergedPdf.save()
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" })
      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = "Valueye-Documentation.pdf"
      a.click()
      URL.revokeObjectURL(a.href)
    } catch (err) {
      console.error("PDF export failed:", err)
    } finally {
      setLoading(false)
    }
  }, [data])

  return { exportAll, loading }
}
