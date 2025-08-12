"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import useStocks from "@/app/hooks/useStocks";
import Stock from "@/app/models/interfaces/stock.interface";
import Spinner from "@/app/components/Spinner/Spinner";
import PageLink from "@/app/components/PageLink/PageLink";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import { useMemo } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { getChangeClass } from "@/app/utils/classNameUtil";
import { formatSignedNumber } from "@/app/utils/format";

const StockDetail = () => {
  const params = useParams<{ name: string }>();
  const stockName = params.name;
  const tickers = useMemo(() => [stockName], [stockName]);

  const { stocks, error, loading } = useStocks(tickers);
  let [stock] = stocks;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{stock?.name}</h1>
      {loading && <Spinner />}
      {!loading && (
        <>
          {error && <ErrorDisplay msg={error} />}
          <div className={styles.stockInfoContainer}>
            <span className={styles.stockPrice}>
              {stock.price} <span>{stock.currency}</span>
            </span>
            <span
              className={`${styles.stockChangeInfo} ${
                stock.change && getChangeClass(stock.change)
              }`}
            >
              {stock.change && formatSignedNumber(stock.change)}
            </span>
          </div>
          <Sparklines
            data={[5, 10, 5, 20, 8, 15]}
            limit={5}
            width={100}
            height={20}
            margin={5}
          >
            <SparklinesLine color="#6ff586" style={{ fill: "none" }} />
          </Sparklines>
          <PageLink href="/" label="Back to my stocks" backLink={true} />
        </>
      )}
    </div>
  );
};

export default StockDetail;
