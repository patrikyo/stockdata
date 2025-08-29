"use client";
import styles from "./page.module.css";
import Stock from "@/app/models/interfaces/stock.interface";
import StockList from "@/app/components/StockList/StockList";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import PageLink from "@/app/components/PageLink/PageLink";
import Spinner from "@/app/components/Spinner/Spinner";
import Filter from "@/app/components/Filter/Filter.component";
import useFetchStocks from "@/app/hooks/useFetchStocks";
import Pagination from "@/app/components/Pagination/Pagination";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;

const ExploreStocks = () => {
  const { stocks, error, loading } = useFetchStocks();
  const [filterInput, setFilterInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize the filtered list to avoid re-calculating on every render
  const filteredStocks = useMemo(() => {
    if (!stocks) {
      return [];
    } // Reset to the first page when the filter changes
    setCurrentPage(1);
    return stocks.filter((stock: Stock) =>
      stock.name.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [stocks, filterInput]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStocks = filteredStocks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className="titel">Explore stocks</h1>

      {error && (
        <div className={styles.errorContainer}>
          <ErrorDisplay msg={error} />{" "}
        </div>
      )}

      {!error && (
        <div className={styles.stockListContainer}>
          <Filter onFilterChange={setFilterInput} />
          <StockList stockList={currentStocks} follow={true} />
          {filteredStocks.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}

      <div className="linkBtnContainer">
        <PageLink href="/" label="Back to My stocks" backLink={true} />
      </div>
    </div>
  );
};

export default ExploreStocks;
