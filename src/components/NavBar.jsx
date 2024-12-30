import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

import "./styles/NavBar.css";

export default function NavBar() {
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
            <h3>@jquirozz</h3>
            <h2>Joseph Quiroz</h2>
          </article>
        </header>
        <section>
          <h2>Settings</h2>
          <p>Coming soon...</p>
        </section>
      </section>
    </nav>
  );
}
