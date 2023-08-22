import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({ handleSearch }) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="input-group mb-3 rounded">
      <input
        type="text"
        className="form-control rounded-start"
        placeholder="Search..."
        name="searchText"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        aria-label="Search"
        aria-describedby="search-button"
      />
      <button
        className="btn btn-outline-secondary rounded-end"
        type="button"
        id="search-button"
        onClick={(e) => {
          e.preventDefault();
          handleSearch(searchText);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}
