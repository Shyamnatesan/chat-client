import React, { useState } from "react";
import FindFriends from "../FindFriends/FindFriends";
import PendingRequests from "../PendingRequests/PendingRequests";
import DiscoverHeader from "./DiscoverHeader";

export default function Discover() {
  const [activeTab, setActiveTab] = useState("find-friends");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="col bg-light">
      <DiscoverHeader />
      <div className="card m-3">
        <div className="card-body">
          <div className="d-flex">
            <div
              className={`dashboard-heading-container m-2 ${
                activeTab === "find-friends" ? "active" : ""
              }`}
            >
              <p
                className="dashboard-heading"
                onClick={() => handleTabChange("find-friends")}
              >
                Find Friends
              </p>
            </div>
            <div
              className={`dashboard-heading-container m-2 ${
                activeTab === "pending-requests" ? "active" : ""
              }`}
            >
              <p
                className="dashboard-heading"
                onClick={() => handleTabChange("pending-requests")}
              >
                Pending Requests
              </p>
            </div>
          </div>
          <div className="row m-4">
            <div className="col-md-12">
              {activeTab === "find-friends" && <FindFriends />}
              {activeTab === "pending-requests" && <PendingRequests />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
