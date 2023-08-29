import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faRightFromBracket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Modal from "../Common/Components/Modal";

export default function NewNavbar() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleChatList = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userdetails");
    navigate("/");
  };

  const handleToggleDiscover = () => {
    navigate("/home/discover");
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
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
              onClick={handleToggleDiscover}
            >
              <FontAwesomeIcon icon={faUserGroup} />
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
            <a href="#" className="nav-link py-3 px-2" title="notifications">
              <FontAwesomeIcon icon={faBell} />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 px-2" title="settings">
              <FontAwesomeIcon icon={faGear} />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 px-2"
              title="logout"
              onClick={handleModalToggle}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </a>
          </li>
        </ul>
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalToggle}
          onConfirm={handleLogout}
        >
          Are you sure you want to log out?
        </Modal>
      </div>
    </div>
  );
}
