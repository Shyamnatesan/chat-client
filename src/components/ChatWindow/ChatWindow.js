import React from "react";
import MessageInput from "../MessageInput/MessageInput";
import MessageDisplay from "../MessageDisplay/MessageDisplay";

export default function ChatWindow({ user }) {
  console.log(user);
  return (
    <div className="col-6 bg-light p-2 d-flex flex-column">
      <div className="d-flex">
        <img
          src={user.imageUrl}
          className="rounded-circle me-2"
          width="50px"
          height="50px"
        ></img>
        <a
          href="#"
          className="nav-link py-3 px-2 rounded"
          style={{ color: "black" }}
        >
          {user.name}
        </a>
      </div>
      <MessageDisplay />
      <MessageInput />
    </div>
  );
}
