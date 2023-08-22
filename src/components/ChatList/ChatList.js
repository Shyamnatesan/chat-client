import React from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function ChatList({ handleToggleChatWindow }) {
  let users = [
    {
      name: "Leslie Alexander",
      imageUrl: require("../../assets/Image_created_with_a_mobile_phone.jpg"),
    },
    {
      name: "Guy Hawkins",
      imageUrl: require("../../assets/Image_created_with_a_mobile_phone.jpg"),
    },
    {
      name: "Jacob Jones",
      imageUrl: require("../../assets/Image_created_with_a_mobile_phone.jpg"),
    },
    {
      name: "Shyam Natesan",
      imageUrl: require("../../assets/Image_created_with_a_mobile_phone.jpg"),
    },
    {
      name: "Natesan Ramalingam",
      imageUrl: require("../../assets/Image_created_with_a_mobile_phone.jpg"),
    },
    {
      name: "Monish Natesan",
      imageUrl: require("../../assets/Image_created_with_a_mobile_phone.jpg"),
    },
  ];

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
                  {user.name}
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
