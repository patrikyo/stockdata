// stockList.tsx
"use client";
import Stock from "@/app/models/interfaces/stock.interface";
import StockListProp from "@/app/models/interfaces/stockListProp.interface";
import styles from "./StockList.module.css";
import PageLink from "../PageLink/PageLink";
import FollowStockItem from "../FollowStockItem/FollowStockItem";
import useLocalStorage from "@/app/hooks/useLocalStorage";

const LOCAL_STORAGE_KEY = "followedStocks";

const StockList: React.FC<StockListProp> = ({ stockList, follow }) => {
  const [followedStocks, setFollowedStocks] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    []
  );

  const toggleFollow = (stockTicker: string) => {
    if (followedStocks.includes(stockTicker)) {
      // Unfollow
      const updated = followedStocks.filter((name) => name !== stockTicker);
      setFollowedStocks(updated);
    } else {
      // Follow
      const updated = [...followedStocks, stockTicker];
      setFollowedStocks(updated);
    }
  };

  return (
    <ul className={styles.stockListContainer}>
      {stockList.map((ele: Stock) => {
        const isFollowed = followedStocks.includes(ele.ticker);
        return (
          <li key={ele.ticker}>
            {follow ? (
              <FollowStockItem
                name={ele.name}
                ticker={ele.ticker}
                isFollowed={isFollowed}
                onToggle={() => toggleFollow(ele.ticker)}
              />
            ) : (
              <div className="linkBtnContainer">
                <PageLink
                  href={`/stock-detail/${ele.ticker}`}
                  label={ele.ticker}
                  change={ele.change}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default StockList;
