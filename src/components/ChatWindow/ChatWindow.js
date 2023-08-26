import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChatWindow({ user, roomId, socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessage("");
    setMessages([]);
    socket.emit("joinRoom", roomId); // Join the private room

    const handleNewMessage = (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [roomId, socket]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const messageData = {
        roomId: roomId, // Pass the roomId
        recipientId: user._id,
        message: message,
      };
      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  return (
    <div className="col-sm-6 bg-light sticky-top min-vh-100">
      <div className="d-flex flex-column p-3">
        <div className="d-flex align-items-center mb-2">
          <img
            src={user.imageUrl}
            className="rounded-circle me-2"
            width="50px"
            height="50px"
          />
          <a
            href="#"
            className="nav-link py-3 px-2 rounded"
            style={{ color: "black" }}
          >
            {user.fullName}
          </a>
        </div>
        <div className="container bg-dark rounded m-2">
          <div
            className="overflow-auto p-2"
            style={{ width: "100%", height: "600px" }}
          >
            {messages.map((message, index) => (
              <div className="d-block">
                <span
                  className={`p-2 mb-2 ${
                    message.senderId === socket.id
                      ? "mr-auto text-white"
                      : "ml-auto text-white"
                  }`}
                >
                  {message.message}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Type your message..."
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ borderColor: "#ced4da" }}
          />
          <button className="btn btn-primary rounded-end" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}
