import React, { useEffect, useState } from "react";
import {
  fetchSentRequests,
  searchUsersBySearchText,
  sendFriendRequest,
} from "../../services/discoverService";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Common/Components/Pagination";
import { useUserContext } from "../../UserContext";

export default function FindFriends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 10; // Number of users to show per page
  const [totalPages, setTotalPages] = useState(0);
  const { currentUser } = useUserContext();

  useEffect(() => {
    async function fetchUserSentRequests() {
      try {
        const response = await fetchSentRequests();
        console.log(response.data);
        setSentRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserSentRequests();
  }, []);

  const fetchSearchResults = async (searchQuery, page) => {
    try {
      const response = await searchUsersBySearchText(
        searchQuery,
        page,
        usersPerPage
      );
      console.log(response.users);
      setSearchResults(response.users);
      const totalResults = response.totalUsers;
      setTotalPages(Math.ceil(totalResults / usersPerPage));
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

  const handlePageChange = async (newPage) => {
    console.log(newPage);
    setPage(newPage);
    if (searchQuery.trim() !== "") {
      fetchSearchResults(searchQuery, newPage);
    }
  };

  const handleAddFriend = async (requestReceiverId) => {
    try {
      const response = await sendFriendRequest(requestReceiverId);
    } catch (error) {
      console.log("error sending friend request", error);
    }
  };

  console.log(searchResults.length);
  console.log(currentUser);

  return (
    <div className="col card">
      <div className="card-body">
        <SearchBar handleSearch={handleSearch} />
        {searchResults.length > 0 && (
          // <div className="card mt-3">
          <>
            <p className="m-1">Results: </p>
            <hr></hr>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Friend Status</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {searchResults.map((user, index) => (
                    <tr key={index}>
                      <td>{user.fullName}</td>
                      <td>
                        {user._id !== currentUser._id ? (
                          sentRequests.includes(user._id) ? (
                            <span className="badge bg-success">
                              Request Sent
                            </span>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddFriend(user._id)}
                            >
                              Add Friend
                            </button>
                          )
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody> */}
                <tbody>
                  {searchResults.map((user, index) => (
                    <tr key={index}>
                      <td>{user.fullName}</td>
                      <td>
                        {user._id !== currentUser._id ? (
                          sentRequests.some(
                            (request) =>
                              request.requestReceiverId === user._id &&
                              request.status === "accepted"
                          ) ? (
                            <span className="badge bg-primary">Friends</span>
                          ) : sentRequests.some(
                              (request) =>
                                request.requestReceiverId === user._id &&
                                request.status === "pending"
                            ) ? (
                            <span className="badge bg-success">
                              Request Sent
                            </span>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddFriend(user._id)}
                            >
                              Add Friend
                            </button>
                          )
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></Pagination>
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
}
