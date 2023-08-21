import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function MessageInput() {
  return (
    <div className="input-group mb-3 rounded">
      <input
        type="text"
        className="form-control rounded-start"
        placeholder="Type your message..."
        style={{ borderColor: "#ced4da" }}
      />
      <button className="btn btn-primary rounded-end">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}
