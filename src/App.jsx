import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Feed from "./pages/Feed";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/feed" element={<Feed />}>
            <Route path=":query" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
