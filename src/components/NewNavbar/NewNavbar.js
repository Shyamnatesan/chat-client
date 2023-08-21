import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";

export default function NewNavbar() {
  // const [selectedContact, setSelectedContact] = useState([]);
  const [showChatList, setShowChatList] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatWindowUser, setChatWindowUser] = useState([]);

  const handleToggleChatList = () => {
    setShowChatList(!showChatList);
  };
  const handleToggleChatWindow = (user) => {
    setChatWindowUser(user);
    setShowChatWindow(true);
  };

  const handleToggleUserProfile = () => {};

  let dummyUsers = [
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-auto bg-dark sticky-top min-vh-100">
          <div className="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
            <a
              href="/"
              className="d-block p-3 link-light text-decoration-none"
              title="chatLogo"
              style={{ marginTop: "50px" }}
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
            <ul
              className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center"
              style={{ marginTop: "50px" }}
            >
              <li>
                <a
                  href="#"
                  className="nav-link py-3 px-2"
                  title="userprofile"
                  onClick={handleToggleUserProfile}
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link py-3 px-2"
                  title="messages"
                  onClick={handleToggleChatList}
                >
                  <FontAwesomeIcon icon={faMessage} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="nav-link py-3 px-2"
                  title="notifications"
                >
                  <FontAwesomeIcon icon={faBell} />
                </a>
              </li>
              <li>
                <a href="#" className="nav-link py-3 px-2" title="settings">
                  <FontAwesomeIcon icon={faGear} />
                </a>
              </li>
              <li>
                <a href="#" className="nav-link py-3 px-2" title="logout">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {showChatList && (
          <ChatList
            users={dummyUsers}
            handleToggleChatWindow={handleToggleChatWindow}
          />
        )}
        {showChatList && showChatWindow && <ChatWindow user={chatWindowUser} />}
      </div>
    </div>
  );
}
