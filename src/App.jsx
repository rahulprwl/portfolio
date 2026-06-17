import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import CareerPage from "./pages/CareerPage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<ProjectsPage />} />
        <Route path="/projects/:id"   element={<ProjectDetail />} />
        <Route path="/career"         element={<CareerPage />} />
        <Route path="/skills"         element={<SkillsPage />} />
        <Route path="/contact"        element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
