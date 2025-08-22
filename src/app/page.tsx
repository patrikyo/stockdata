"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import StockList from "./components/StockList/StockList";
import PageLink from "./components/PageLink/PageLink";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import useStocks from "./hooks/useStocks";
import Spinner from "./components/Spinner/Spinner";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FOLLOW_KEY = "followedStocks";

export default function Home() {
  const [tickers, setTickers] = useState<string[]>([]);

  // Hämta följda aktier från localStorage
  useEffect(() => {
    const stored = localStorage.getItem(FOLLOW_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTickers(parsed);
        }
      } catch (e) {
        console.error("Kunde inte parsa followedStocks från localStorage");
      }
    }
  }, []);

  const { stocks, error, loading } = useStocks(tickers);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My stocks</h1>
      {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className={styles.contentContainer}>
          {error && <ErrorDisplay msg={error} />}
          {tickers.length === 0 ? (
            <div className={styles.emptyListContainer}>
              <p>You are not following any stocks yet.</p>
              <FontAwesomeIcon
                icon={faList}
                id={styles.listIcon}
                aria-hidden="true"
              />
            </div>
          ) : (
            <div className={styles.listContainer}>
              <StockList stockList={stocks} follow={false} />
            </div>
          )}
        </div>
      )}
      <PageLink href="/explore-stocks" label="Utforska fler aktier" />
    </div>
  );
}
