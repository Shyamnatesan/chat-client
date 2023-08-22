import React from "react";

export default function PendingRequests() {
  const pendingRequests = [
    "Shyam sent you a friend request",
    "Swas sent you a friend request",
    "Emily sent you a friend request",
    "John sent you a friend request",
    "Natalie sent you a friend request",
    "Monish sent you a friend request",
    "Vishal sent you a friend request",
    "Sathish sent you a friend request",
    "Navdee sent you a friend request",
    "Kishan sent you a friend request",
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Pending Requests</h2>
        <ul className="list-group">
          {pendingRequests.map((request, index) => (
            <li key={index} className="list-group-item">
              {request}
              <button className="btn btn-sm btn-primary ms-3">Accept</button>
              <button className="btn btn-sm btn-danger">Decline</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
