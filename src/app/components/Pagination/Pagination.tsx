import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Pagination.module.css";
import React from "react";
import PaginationProps from "@/app/models/interfaces/PaginationProps.interface";

const MAX_VISIBLE_PAGES = 3;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePageNumbers = () => {
    const pages = [];
    let startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
    );
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePageNumbers();

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
      {visiblePages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={styles.pageBtn}>
            1
          </button>
          {visiblePages[0] > 2 && <span className={styles.ellipsis}>...</span>}
        </>
      )}
      {visiblePages.map((number) => (
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
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={styles.ellipsis}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={styles.pageBtn}
          >
            {totalPages}
          </button>
        </>
      )}
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
