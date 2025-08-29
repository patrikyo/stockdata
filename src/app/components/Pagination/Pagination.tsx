import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Pagination.module.css";
import React from "react";
import PaginationProps from "@/app/models/interfaces/PaginationProps.interface";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.pageBtn} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pageBtn} ${
            number === currentPage ? styles.active : ""
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles.pageBtn} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Pagination;
