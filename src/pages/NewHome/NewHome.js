// import React, { useEffect, useState } from "react";
// import NewNavbar from "../../components/NewNavbar/NewNavbar";
// import { Route, Routes } from "react-router-dom";
// import ChatList from "../../components/ChatList/ChatList";
// import ChatWindow from "../../components/ChatWindow/ChatWindow";
// import Discover from "../../components/Discover/Discover";
// import { io } from "socket.io-client";

// export default function NewHome() {
//   const [showChatWindow, setShowChatWindow] = useState(false);
//   const [chatWindowUser, setChatWindowUser] = useState([]);
//   const handleToggleChatWindow = (user) => {
//     setShowChatWindow(true);
//     setChatWindowUser(user);
//   };

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       transports: ["websocket", "polling"],
//     }); // Replace with your backend URL
//     // Example: Listening for a new message event
//     socket.on("newMessage", (message) => {
//       console.log("New message received:", message);
//       // Update your UI or state to display the new message
//     });

//     return () => {
//       socket.disconnect(); // Disconnect when the component unmounts
//     };
//   }, []);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <NewNavbar />
//         <Routes>
//           <Route
//             exact
//             path="/"
//             element={
//               <>
//                 <ChatList handleToggleChatWindow={handleToggleChatWindow} />
//                 {showChatWindow && <ChatWindow user={chatWindowUser} />}
//               </>
//             }
//           ></Route>
//           <Route path="/discover" element={<Discover />}></Route>
//         </Routes>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import NewNavbar from "../../components/NewNavbar/NewNavbar";
import { Route, Routes } from "react-router-dom";
import ChatList from "../../components/ChatList/ChatList";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Discover from "../../components/Discover/Discover";
import { io } from "socket.io-client"; // Make sure you're importing 'io' from 'socket.io-client'
import { fetchRoomId } from "../../services/homeService";

export default function NewHome() {
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
    const socket = io("http://localhost:5000"); // Replace with your backend URL
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      // Update your UI or state to display the new message
    });

    return () => {
      socket.disconnect();
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
                  <ChatWindow user={chatWindowUser} roomId={chatRoomId} />
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
