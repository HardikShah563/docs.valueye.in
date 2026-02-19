import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DocsLayout } from "@/components/layout/DocsLayout"
import { WelcomePage } from "@/pages/WelcomePage"
import { ModulePage } from "@/pages/ModulePage"
import { PageNotFound } from "./components/common/page-not-found"

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DocsLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path="docs/:slug" element={<ModulePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
