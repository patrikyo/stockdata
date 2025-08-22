"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import useStocks from "@/app/hooks/useStocks";
import Spinner from "@/app/components/Spinner/Spinner";
import PageLink from "@/app/components/PageLink/PageLink";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import { useMemo } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { getChangeClass } from "@/app/utils/classNameUtil";
import { formatSignedNumber } from "@/app/utils/format";
import StockStats from "@/app/components/StockStats/StockStats";

const StockDetail = () => {
  const params = useParams<{ name: string }>();
  const stockName = params.name;
  const tickers = useMemo(() => [stockName], [stockName]);

  const { stocks, error, loading } = useStocks(tickers);
  let [stock] = stocks;
  const sparklineData = stock?.priceHistory || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{stock?.name}</h1>
      {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {!loading && (
        <>
          {error && <ErrorDisplay msg={error} />}
          <div className={styles.stockInfoContainer}>
            <span className={styles.stockPrice}>
              {stock.price} <span>{stock.currency}</span>
            </span>
            {stock.change !== undefined && (
              <>
                <span
                  className={`${styles.stockChangeInfo} ${getChangeClass(
                    stock.change
                  )}`}
                >
                  {formatSignedNumber(stock.change)}
                </span>
                <Sparklines
                  data={sparklineData}
                  limit={5}
                  width={100}
                  height={35}
                  margin={5}
                >
                  <SparklinesLine
                    color={
                      stock?.change === 0
                        ? "#fff"
                        : stock.change > 0
                        ? "#6ff586"
                        : "#f34b4b"
                    }
                    style={{ fill: "none" }}
                  />
                </Sparklines>
              </>
            )}
          </div>
          {stock.metrics && (
            <StockStats metrics={stock.metrics} currency={stock.currency} />
          )}
          <PageLink href="/" label="Back to my stocks" backLink={true} />
        </>
      )}
    </div>
  );
};

export default StockDetail;
