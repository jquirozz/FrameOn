import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

import "./styles/NavBar.css";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";

export default function NavBar({ theme, toggleTheme }) {
  return (
    <nav className="NavBar">
      <Link className="logo" to="/">
        <img src="/logo/logo_transparent.png" />
      </Link>

      <SearchBar />

      <aside>
        <a
          href="https://github.com/jquirozz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoGithub />
        </a>
        <button onClick={toggleTheme}>
          {theme === "light" ? <IoMoon /> : <IoSunny />}
        </button>
      </aside>
    </nav>
  );
}
