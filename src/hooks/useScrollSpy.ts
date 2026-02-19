import { useEffect, useState } from "react"

export interface TocItem {
  id: string
  text: string
  level: number
}

export function useScrollSpy(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  const [activeId, setActiveId] = useState<string>("")
  const [headings, setHeadings] = useState<TocItem[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll("h1[id], h2[id], h3[id]")
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1), 10),
    }))
    setHeadings(items)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const sorted = visible.sort(
            (a, b) =>
              (a.boundingClientRect?.top ?? 0) - (b.boundingClientRect?.top ?? 0)
          )
          const top = sorted[0]
          if (top?.target.id) setActiveId(top.target.id)
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))
    if (items[0]) setActiveId(items[0].id)

    return () => observer.disconnect()
  }, [containerRef, ...deps])

  return { activeId, headings }
}
