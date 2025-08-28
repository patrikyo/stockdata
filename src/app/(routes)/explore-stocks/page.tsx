"use client";
import styles from "./page.module.css";
import Stock from "@/app/models/interfaces/stock.interface";
import StockList from "@/app/components/StockList/StockList";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import PageLink from "@/app/components/PageLink/PageLink";
import Spinner from "@/app/components/Spinner/Spinner";
import Filter from "@/app/components/Filter/Filter.component";
import useFetchStocks from "@/app/hooks/useFetchStocks";
import { useState, useMemo } from "react";

const ExploreStocks = () => {
  const { stocks, error, loading } = useFetchStocks();
  const [filterInput, setFilterInput] = useState("");

  // Memoize the filtered list to avoid re-calculating on every render
  const filteredStocks = useMemo(() => {
    if (!stocks) {
      return [];
    }
    return stocks.filter((stock: Stock) =>
      stock.name.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [stocks, filterInput]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Explore stocks</h1>
      {error && <ErrorDisplay msg={error} />}
      {!error && (
        <>
          <Filter onFilterChange={setFilterInput} />
          <StockList stockList={filteredStocks} follow={true} />
        </>
      )}
      <div className="linkBtnContainer">
        <PageLink href="/" label="Back to My stocks" backLink={true} />
      </div>
    </div>
  );
};

export default ExploreStocks;
