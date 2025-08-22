"use client";
import { useEffect, useState } from "react";
import StockList from "@/app/components/StockList/StockList";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import Stock from "@/app/models/interfaces/stock.interface";
import styles from "./page.module.css";
import PageLink from "@/app/components/PageLink/PageLink";
import Spinner from "@/app/components/Spinner/Spinner";

const ExploreStocks = () => {
  const [names, setNames] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockNames = () => {
      fetch("http://127.0.0.1:5000/api/stocks/names")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Could not retrieve the list. Please try again later."
            );
          }
          setError(null);

          return response.json();
        })
        .then((res) => {
          setNames(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchStockNames();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Explore stocks</h1>
      {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {!loading && (
        <>
          {error && <ErrorDisplay msg={error} />}
          {!error && <StockList stockList={names} follow={true} />}
          <div className={styles.btnContainer}>
            <PageLink href="/" label="Back to My stocks" backLink={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreStocks;
