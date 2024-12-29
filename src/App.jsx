import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar setQuery={setQuery} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
