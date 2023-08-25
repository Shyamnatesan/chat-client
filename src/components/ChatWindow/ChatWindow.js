import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChatWindow({ user, roomId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const componentStyle = {
    backgroundImage: `url(${require("../../assets/pngtree-watercolor-graffiti-brush-scribble-background-image_725792.jpeg")})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundRepeat: "no-repeat", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    padding: "20px",
    color: "white",
    borderRadius: "15px",
  };

  useEffect(() => {
    setMessage("");
    setMessages([]);
    const newSocket = io("http://localhost:5000");
    newSocket.emit("joinRoom", roomId); // Join the private room
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket]);

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
          {user.fullName}
        </a>
      </div>
      {/* message display */}
      <div className="flex-grow-1 p-2" style={componentStyle}>
        {messages &&
          messages.map((message) => {
            return <p>{message.message}</p>;
          })}
      </div>
      {/* message input */}
      <div className="input-group mb-3 rounded">
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
  );
}
