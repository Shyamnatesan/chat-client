import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function DiscoverHeader() {
  return (
    <div className="d-flex justify-content-between align-items-start p-3 m-3">
      <h1 className="m-0 text-decoration-none">Discover</h1>
      <FontAwesomeIcon icon={faBell} size="lg" />
    </div>
  );
}
