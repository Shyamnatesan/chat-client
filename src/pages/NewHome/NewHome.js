import React, { useEffect, useState } from "react";
import NewNavbar from "../../components/NewNavbar/NewNavbar";
import { Route, Routes } from "react-router-dom";
import ChatList from "../../components/ChatList/ChatList";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Discover from "../../components/Discover/Discover";
import { io } from "socket.io-client"; // Make sure you're importing 'io' from 'socket.io-client'
import { fetchRoomId } from "../../services/homeService";

export default function NewHome() {
  const [socket, setSocket] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatWindowUser, setChatWindowUser] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");

  const handleToggleChatWindow = async (user) => {
    setShowChatWindow(true);
    setChatWindowUser(user);

    try {
      const response = await fetchRoomId(user);
      if (response.status) {
        setChatRoomId(response.roomId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Replace with your backend URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <NewNavbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <ChatList handleToggleChatWindow={handleToggleChatWindow} />
                {showChatWindow && (
                  <ChatWindow
                    user={chatWindowUser}
                    roomId={chatRoomId}
                    socket={socket}
                  />
                )}
              </>
            }
          ></Route>
          <Route path="/discover" element={<Discover />}></Route>
        </Routes>
      </div>
    </div>
  );
}
