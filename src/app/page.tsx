"use client";
import styles from "./page.module.css";
import useStocks from "./hooks/useStocks";
import StockList from "./components/StockList/StockList";
import PageLink from "./components/PageLink/PageLink";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import Spinner from "./components/Spinner/Spinner";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination/Pagination";
import { useState, useMemo } from "react";

const FOLLOW_KEY = "followedStocks";
const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [tickers] = useLocalStorage(FOLLOW_KEY, []);
  const { stocks, error, loading } = useStocks(tickers);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(stocks.length / ITEMS_PER_PAGE);
  const currentStocks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return stocks.slice(startIndex, endIndex);
  }, [stocks, currentPage]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className="titel">My stocks</h1>
      <div className={styles.listContainer}>
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
          <>
            <StockList stockList={currentStocks} follow={false} />
          </>
        )}
      </div>
      <div>
        <div className={styles.paginationContainer}>
          {stocks.length > 0 && (
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
        <div className="linkBtnContainer">
          <PageLink href="/explore-stocks" label="Explore more stocks" />
        </div>
      </div>
    </div>
  );
}
