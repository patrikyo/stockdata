"use client";
import styles from "./page.module.css";
import Stock from "@/app/models/interfaces/stock.interface";
import StockList from "@/app/components/StockList/StockList";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import PageLink from "@/app/components/PageLink/PageLink";
import Spinner from "@/app/components/Spinner/Spinner";
import useFetchStocks from "@/app/hooks/useFetchStocks";

const ExploreStocks = () => {
  const { stocks, error, loading } = useFetchStocks();

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
      {!error && <StockList stockList={stocks} follow={true} />}
      <div className={styles.btnContainer}>
        <PageLink href="/" label="Back to My stocks" backLink={true} />
      </div>
    </div>
  );
};

export default ExploreStocks;
