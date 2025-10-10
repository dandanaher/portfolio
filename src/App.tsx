
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Me from "@/pages/Me";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";
import Library from "@/pages/Library";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Me />} />
        <Route path="/me" element={<Me />} />
        <Route path="/library" element={<Library />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
