import React from "react";
import FilterProps from "@/app/models/interfaces/filterProps";
import styles from "./Filter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search stocks"
        onChange={(e) => onFilterChange(e.target.value)}
        className={styles.filterInput}
      />
    </div>
  );
};

export default Filter;
