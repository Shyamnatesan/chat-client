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

  return (
    <>
      <div className="col-3 bg-light">
        <h1
          className="d-block p-3  text-decoration-none"
          style={{ marginTop: "30px" }}
        >
          Messages
        </h1>
        <SearchBar handleSearch={handleSearch} />
        <ul
          className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto"
          style={{ marginTop: "50px" }}
        >
          <p>All Messages</p>
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
        </ul>
      </div>
      {/* {selectedUser.length > 0 && <ChatWindow user={selectedUser} />} */}
    </>
  );
}
