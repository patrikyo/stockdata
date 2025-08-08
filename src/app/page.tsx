"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import StockList from "./components/StockList/StockList";
import PageLink from "./components/PageLink/PageLink";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import useStocks from "./hooks/useStocks";
import Spinner from "./components/Spinner/Spinner";

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
      <h1>Mina aktier</h1>
      <div className={styles.spinnerContainer}>{loading && <Spinner />}</div>
      {!loading && (
        <>
          {error && <ErrorDisplay msg={error} />}
          {tickers.length === 0 ? (
            <p>Du följer inga aktier ännu.</p>
          ) : (
            <StockList stockList={stocks} follow={false} />
          )}
          <PageLink href="/explore-stocks" label="Utforska fler aktier" />
        </>
      )}
    </div>
  );
}
