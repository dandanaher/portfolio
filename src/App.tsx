
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Me from "@/pages/Me";
import Thoughts from "@/pages/Thoughts";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";
import Library from "@/pages/Library";
import { ThemeProvider } from "@/providers/theme-provider";

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Me />} />
          <Route path="/me" element={<Me />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/library" element={<Library />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
