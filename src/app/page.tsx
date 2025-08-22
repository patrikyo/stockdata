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

const FOLLOW_KEY = "followedStocks";

export default function Home() {
  const [tickers] = useLocalStorage(FOLLOW_KEY, []);
  const { stocks, error, loading } = useStocks(tickers);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My stocks</h1>
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
      <PageLink href="/explore-stocks" label="Utforska fler aktier" />
    </div>
  );
}
