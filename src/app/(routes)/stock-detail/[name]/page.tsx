"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import useStocks from "@/app/hooks/useStocks";
import Spinner from "@/app/components/Spinner/Spinner";
import PageLink from "@/app/components/PageLink/PageLink";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import StockStats from "@/app/components/StockStats/StockStats";
import styles from "./page.module.css";
import StockInfo from "@/app/components/StockInfo/StockInfo";

const StockDetail = () => {
  const params = useParams<{ name: string }>();
  const stockName = params.name;
  const tickers = useMemo(() => [stockName], [stockName]);

  const { stocks, error, loading } = useStocks(tickers);
  const [stock] = stocks;

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{stock?.name}</h1>

      {error && <ErrorDisplay msg={error} />}
      {stock && (
        <>
          <StockInfo
            price={stock.price}
            currency={stock.currency}
            change={stock.change}
            priceHistory={stock.priceHistory}
          />
          {stock.metrics && (
            <StockStats metrics={stock.metrics} currency={stock.currency} />
          )}
        </>
      )}
      <PageLink href="/" label="Back to my stocks" backLink={true} />
    </div>
  );
};

export default StockDetail;
