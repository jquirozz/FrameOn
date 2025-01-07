import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

import "./styles/NavBar.css";

export default function NavBar({ theme, toggleTheme }) {
  const [menu, setMenu] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  return (
    <nav className="NavBar">
      <Link className="logo" to="/">
        <img src="/logo/logo_transparent.png" />
      </Link>

      <SearchBar />

      <button className="profile" onClick={handleMenuToggle} />

      <section className={`menu ${menu ? "open" : "close"}`}>
        <header>
          <div className="profile_photo" />
          <article className="info">
            <h2>Joseph Quiroz</h2>
            <h3>@username</h3>
          </article>
        </header>
        <section className="settings">
          <h2>Settings</h2>
          <SettingSection title="Toggle Theme: ">
            <button type="button" onClick={toggleTheme}>
              {theme === "light" ? "dark" : "light"}
            </button>
          </SettingSection>
        </section>
      </section>
    </nav>
  );
}

function SettingSection({ title, children }) {
  return (
    <div className="SettingSection">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
