"use client";
import { useEffect, useState } from "react";
import StockList from "@/app/components/StockList/StockList";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import Stock from "@/app/models/interfaces/stock.interface";
import styles from "./page.module.css";

const ExploreStocks = () => {
  const [names, setNames] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockNames = () => {
      fetch("http://127.0.0.1:5000/api/stocks/names")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Det gick inte att hämta listan. Försök igen senare."
            );
          }
          setError(null);
          return response.json();
        })
        .then((res) => setNames(res))
        .catch((err) => setError(err.message));
    };

    fetchStockNames();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Utforska aktier</h1>

      {error ? (
        <ErrorDisplay msg={error} />
      ) : (
        <StockList stockList={names} follow={true} />
      )}
    </div>
  );
};

export default ExploreStocks;
