import React, { useState } from "react";
import NewNavbar from "../../components/NewNavbar/NewNavbar";
import { Route, Routes } from "react-router-dom";
import ChatList from "../../components/ChatList/ChatList";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Discover from "../../components/Discover/Discover";

export default function NewHome() {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatWindowUser, setChatWindowUser] = useState([]);
  const handleToggleChatWindow = (user) => {
    setShowChatWindow(true);
    setChatWindowUser(user);
  };
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
                {showChatWindow && <ChatWindow user={chatWindowUser} />}
              </>
            }
          ></Route>
          <Route path="/discover" element={<Discover />}></Route>
        </Routes>
      </div>
    </div>
  );
}
