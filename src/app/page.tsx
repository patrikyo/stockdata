"use client";
import styles from "./page.module.css";

import StockList from "./components/StockList/StockList";
import PageLink from "./components/PageLink/PageLink";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import useStocks from "./hooks/useStocks";

export default function Home() {
  const tickers = ["ABB.ST", "AFRY.ST", "ALFA.ST"];
  const { stocks, error, loading } = useStocks(tickers);

  return (
    <div className={styles.container}>
      {loading && <p>Laddar......</p>}
      <h1>Mina aktier</h1>

      {error && <ErrorDisplay msg={error} />}

      <StockList stockList={stocks} follow={false} />

      <PageLink href="/explore-stocks" label="Utforska fler aktier" />
    </div>
  );
}
