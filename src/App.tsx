import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/layout/Header";
import { Footer } from "./Components/layout/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectPage } from "./pages/ProjectPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Favourites } from "./pages/Favourites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Categories } from "./pages/Categories";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ea", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"                        element={<Home />} />
          <Route path="/projects"                element={<Projects />} />
          <Route path="/projects/:slug"          element={<ProjectPage />} />
          <Route path="/categories"    element={<Categories />} />
          <Route path="/categories/:category"    element={<CategoryPage />} />
          <Route path="/favourites"              element={<Favourites />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
        toastStyle={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.08em",
          background: "#0a0908",
          color: "#f5f0ea",
          borderRadius: 0,
          boxShadow: "none",
          border: "1px solid rgba(245,240,234,0.1)",
          minHeight: "auto",
          padding: "0.65rem 1rem",
        }}
      />
    </div>
  );
}