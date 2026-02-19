import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import docsData from "@/data/docs.json"
import type { DocsData } from "@/types/docs"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { RightToc } from "./RightToc"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { getModuleById } from "@/types/docs"
import { useRef } from "react"

const data = docsData as DocsData

export function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)
  const { activeId, headings } = useScrollSpy(contentRef, [location.pathname])

  const moduleId = location.pathname.replace(/^\/docs\//, "") || undefined
  const module = moduleId ? getModuleById(data, moduleId) : undefined

  return (
    <div className="min-h-screen bg-background">
      <Header
        data={data}
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
        currentModuleId={module?.id}
        currentModuleTitle={module?.title}
        currentModuleHtml={module?.html}
      />
      <div className="flex">
        <Sidebar data={data} />
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div ref={contentRef} className="mx-auto max-w-4xl px-6 py-10">
            <Outlet />
          </div>
        </main>
        <RightToc headings={headings} activeId={activeId} />
      </div>
    </div>
  )
}
