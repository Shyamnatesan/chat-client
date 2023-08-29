import React, { useEffect, useRef, useState } from "react";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMessagesByRoomId } from "../../services/messageService";
import { useUserContext } from "../../UserContext";

export default function ChatWindow({ user, roomId, socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const { currentUser } = useUserContext();
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  const fetchMessages = async (lastMessageTimestamp) => {
    if (setHasMoreMessages) {
      try {
        const response = await getMessagesByRoomId(
          roomId,
          lastMessageTimestamp
        );
        if (response.messages.length === 0) {
          setHasMoreMessages(false);
        } else {
          setHasMoreMessages(true);
          const reversed = [...response.messages].reverse();
          if (!lastMessageTimestamp) {
            setMessages((prevMessages) => [...prevMessages, ...reversed]);
          } else {
            setMessages((prevMessages) => [...reversed, ...prevMessages]);
          }
        }

        console.log("updated message");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNewMessage = (messageData) => {
    setMessages((prevMessages) => [...prevMessages, messageData]);
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  const handleScroll = () => {
    if (
      messagesContainerRef.current.scrollTop === 0 &&
      hasMoreMessages &&
      messages.length > 0
    ) {
      const lastMessageTimestamp = messages[0].timestamp;
      fetchMessages(lastMessageTimestamp);
    }
  };

  const sendMessage = () => {
    if (socket && message.trim()) {
      const messageData = {
        roomId: roomId, // Pass the roomId
        recipientId: user._id,
        message: message,
        senderId: currentUser._id,
      };
      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  console.log(messages);

  useEffect(() => {
    setMessage("");
    setMessages([]);
    socket.emit("joinRoom", roomId); // Join the private room
    fetchMessages();
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [roomId, socket]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        <div className="container rounded m-2">
          <div
            ref={messagesContainerRef}
            className="overflow-auto p-2"
            style={{ width: "100%", height: "600px" }}
            onScroll={handleScroll}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-block ${
                  message.senderId === currentUser._id
                    ? "d-flex justify-content-end"
                    : "d-flex justify-content-start"
                }`}
              >
                <span
                  className={`mb-2 rounded${
                    message.senderId === currentUser._id
                      ? "bg-primary"
                      : "bg-secondary"
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
