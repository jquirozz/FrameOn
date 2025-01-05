import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useDebounce from "./../hooks/useDebounce";

import "./styles/SearchBar.css";
import { IoSearch, IoClose } from "react-icons/io5";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const search = useDebounce(inputValue);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleInputChange = (e) => {
    // Input validation
    const regex = /^[A-Za-z0-9\s]*$/; // A-Z || a-z || 0-9
    const isValid = regex.test(e.target.value);
    isValid && setInputValue(e.target.value);
  };

  const handleSearchButton = () => {
    if (inputValue) {
      setInputValue("");
    } else {
      const input = document.querySelector("#searchInput");
      input.focus();
    }
  };

  useEffect(() => {
    if (search) {
      navigate(`/search/${search}`);
    }
  }, [search]);

  useEffect(() => {
    const isFeedPage = pathname === "/" || pathname.startsWith("/search");
    !isFeedPage && setInputValue("");
  }, [pathname]);

  return (
    <section className="SearchBar">
      <input
        id="searchInput"
        type="text"
        autoComplete="off"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchButton}>
        {inputValue ? <IoClose /> : <IoSearch />}
      </button>
    </section>
  );
}
