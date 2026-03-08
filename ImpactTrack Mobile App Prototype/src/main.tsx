import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompaniesProvider } from "./context/CompaniesContext";
import App from "./App.tsx";
import { AdminPage } from "./components/AdminPage";
import { AdminCompanyFormPage } from "./components/AdminCompanyFormPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <CompaniesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/nova-empresa" element={<AdminCompanyFormPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </CompaniesProvider>
);
