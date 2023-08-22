import React, { useState } from "react";
import { searchUsersBySearchText } from "../../services/discoverService";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

export default function FindFriends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 10; // Number of users to show per page

  const fetchSearchResults = async (searchQuery, page) => {
    try {
      const response = await searchUsersBySearchText(
        searchQuery,
        page,
        usersPerPage
      );
      console.log(response.users);
      setSearchResults(response.users);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = async (searchText) => {
    console.log(searchText);
    setSearchQuery(searchText);
    setPage(1);
    if (searchText.trim() !== "") {
      fetchSearchResults(searchText, 1);
    } else {
      setSearchResults([]);
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    fetchSearchResults(searchQuery, nextPage);
    setPage(nextPage);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      fetchSearchResults(searchQuery, prevPage);
      setPage(prevPage);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <SearchBar handleSearch={handleSearch} />
        {searchResults.length > 0 && (
          <div className="card mt-3">
            <p className="m-1">Results: </p>
            <hr></hr>
            <div className="card-body">
              {searchResults.map((user, index) => (
                <div key={index} className="mb-3">
                  <h4 className="fw-normal">{user.fullName}</h4>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-3">
              <a
                className="nav-link py-3 px-2 m-1"
                onClick={handlePrevPage}
                disabled={page === 1}
                style={{ marginRight: "10px" }}
              >
                <FontAwesomeIcon icon={faLessThan} />
              </a>
              <a
                className="nav-link py-3 px-2 m-1"
                onClick={handleNextPage}
                disabled={searchResults.length < usersPerPage}
              >
                <FontAwesomeIcon icon={faGreaterThan} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
