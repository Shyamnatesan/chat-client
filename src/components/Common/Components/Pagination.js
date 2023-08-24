import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  console.log(currentPage, totalPages);
  const handlePageChange = (newPage) => {
    console.log(newPage);
    if (newPage >= 1) {
      console.log("calling parent component");
      onPageChange(newPage);
    }
  };

  console.log("pagination component rendering");
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </a>
        </li>

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </a>
        </li>
      </ul>
    </nav>
  );
}
