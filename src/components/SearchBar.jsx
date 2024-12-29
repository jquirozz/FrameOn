import { useEffect, useState } from "react";

import useDebounce from "./../hooks/useDebounce";

import "./styles/SearchBar.css";
import { IoSearch, IoClose } from "react-icons/io5";

export default function SearchBar({ setQuery }) {
  const [inputValue, setInputValue] = useState("");
  const search = useDebounce(inputValue);

  const handleInputChange = (e) => {
    // Input validation
    const regex = /^[A-Za-z\s]+$/; // A-Z || a-z || " "
    const isValid = regex.test(e.target.value) || " ";
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
    setQuery(search);
  }, [search]);

  return (
    <section className="SearchBar">
      <input
        id="searchInput"
        type="text"
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
