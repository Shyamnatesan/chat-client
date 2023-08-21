import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar() {
  return (
    <div className="input-group mb-3 rounded">
      <input
        type="text"
        className="form-control rounded-start"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search-button"
      />
      <button
        className="btn btn-outline-secondary rounded-end"
        type="button"
        id="search-button"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}
