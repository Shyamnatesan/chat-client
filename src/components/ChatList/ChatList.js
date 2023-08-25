import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchFriendsForUser } from "../../services/homeService";

export default function ChatList({ handleToggleChatWindow }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetchFriendsForUser();
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserDetails();
  }, []);

  const handleUserClick = (user) => {
    console.log(user);
    handleToggleChatWindow(user);
  };

  const handleSearch = () => {};

  console.log(users);

  return (
    <div className="col-sm-3 bg-light sticky-top min-vh-100">
      <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
        <h1 className="p-3  text-decoration-none" style={{ marginTop: "5%" }}>
          Messages
        </h1>
        <SearchBar handleSearch={handleSearch} />

        <p>All Messages</p>
        <div className="container vh-100">
          <div
            className="overflow-auto p-3 bg-light"
            style={{ width: "100%", height: "inherit" }}
          >
            {users.map((user, index) => {
              return (
                <li
                  className="nav-item d-flex mb-3"
                  key={index}
                  onClick={() => handleUserClick(user)}
                >
                  <img
                    src={user.imageUrl}
                    className="rounded-circle me-2"
                    width="50px"
                    height="50px"
                  ></img>
                  <a
                    href="#"
                    className="nav-link py-3 px-2"
                    style={{ color: "black" }}
                  >
                    {user.fullName}
                  </a>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
