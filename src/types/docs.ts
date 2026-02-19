export interface DocModule {
  id: string
  title: string
  html: string
}

export interface DocSection {
  id: string
  title: string
  modules: DocModule[]
}

export interface DocsData {
  sections: DocSection[]
}

export function flattenModules(data: DocsData): DocModule[] {
  return data.sections.flatMap((s) => s.modules)
}

export function getModuleById(
  data: DocsData,
  id: string
): DocModule | undefined {
  for (const section of data.sections) {
    const found = section.modules.find((m) => m.id === id)
    if (found) return found
  }
  return undefined
}

export function getSectionForModule(
  data: DocsData,
  moduleId: string
): DocSection | undefined {
  return data.sections.find((s) => s.modules.some((m) => m.id === moduleId))
}
