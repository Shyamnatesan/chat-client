import React, { useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FindFriends from "../FindFriends/FindFriends";
import PendingRequests from "../PendingRequests/PendingRequests";
import DiscoverHeader from "./DiscoverHeader";

export default function Discover() {
  const [showFindFriendsCard, setShowFindFriendsCard] = useState(false);
  const [showPendingRequestsCard, setShowPendingRequestsCard] = useState(false);

  console.log("discover rendering");
  const toggleFindFriendsCard = () => {
    setShowPendingRequestsCard(false);
    setShowFindFriendsCard(true);
  };

  const togglePendingRequestsCard = () => {
    setShowFindFriendsCard(false);
    setShowPendingRequestsCard(true);
  };
  return (
    <div className="col bg-light">
      <DiscoverHeader />
      <div className="card m-3">
        <div className="card-body">
          <div className="d-flex">
            <div className="dashboard-heading-container">
              <p
                className={`dashboard-heading ${
                  showFindFriendsCard ? "active" : ""
                } m-2`}
                onClick={toggleFindFriendsCard}
              >
                Find Friends
              </p>
            </div>
            <div className="dashboard-heading-container">
              <p
                className={`dashboard-heading ${
                  showPendingRequestsCard ? "active" : ""
                } m-2`}
                onClick={togglePendingRequestsCard}
              >
                Pending Requests
              </p>
            </div>
          </div>
          {/* Show the corresponding cards based on the active state */}
          {showFindFriendsCard && (
            <div className="row m-4">
              <div className="col-md-6"></div>
              <FindFriends />
            </div>
          )}
          {showPendingRequestsCard && (
            <div className="row m-4">
              <div className="col-md-6"></div>
              <PendingRequests />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
