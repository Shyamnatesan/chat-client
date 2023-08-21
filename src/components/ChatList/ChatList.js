import React from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function ChatList({ users, handleToggleChatWindow }) {
  const handleUserClick = (user) => {
    handleToggleChatWindow(user);
  };

  return (
    <div className="col-3 bg-light">
      <h1
        className="d-block p-3  text-decoration-none"
        style={{ marginTop: "30px" }}
      >
        Messages
      </h1>
      <SearchBar />
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
                {user.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
