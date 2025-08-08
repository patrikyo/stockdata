import Stock from "@/app/models/interfaces/stock.interface";
import StockListProp from "@/app/models/interfaces/stockListProp.interface";
import styles from "./StockList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "followedStocks";

const StockList: React.FC<StockListProp> = ({ stockList, follow }) => {
  const [followedStocks, setFollowedStocks] = useState<string[]>([]);

  // Ladda följda aktier från localStorage när komponenten mountas
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFollowedStocks(parsed);
        }
      } catch (error) {
        console.error("Kunde inte läsa följda aktier från localStorage");
      }
    }
  }, []);

  const toggleFollow = (stockName: string) => {
    setFollowedStocks((prev) => {
      let updated;
      if (prev.includes(stockName)) {
        // Unfollow
        updated = prev.filter((name) => name !== stockName);
      } else {
        // Follow
        updated = [...prev, stockName];
      }

      // Uppdatera localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <ul className={styles.stockListContainer}>
      {stockList.map((ele: Stock) => {
        const isFollowed = followedStocks.includes(ele.name);

        return (
          <li className={styles.stockItemContainer} key={ele.name}>
            {ele.name}
            {follow ? (
              <button
                className={styles.followBtnContainer}
                onClick={() => toggleFollow(ele.name)}
              >
                <FontAwesomeIcon
                  icon={isFollowed ? faMinus : faPlus}
                  id={styles.plusIcon}
                />
                <span>{isFollowed ? "Unfollow" : "Follow"}</span>
              </button>
            ) : (
              <span className={styles.change}>{ele.change}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default StockList;
