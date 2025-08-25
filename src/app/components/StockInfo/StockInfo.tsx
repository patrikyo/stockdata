import { Sparklines, SparklinesLine } from "react-sparklines";
import { getChangeClass } from "@/app/utils/classNameUtil";
import { formatSignedNumber } from "@/app/utils/format";
import styles from "./StockInfo.module.css";

interface StockInfoProps {
  price?: number;
  currency?: string;
  change?: number;
  priceHistory?: number[];
}

const StockInfo = ({
  price,
  currency,
  change,
  priceHistory,
}: StockInfoProps) => {
  const sparklineData = priceHistory || [];

  const getSparklineColor = () => {
    if (change === undefined || change === 0) return "#fff";
    return change > 0 ? "#6ff586" : "#f34b4b";
  };

  return (
    <div className={styles.stockInfoContainer}>
      <span className={styles.stockPrice}>
        {price} {currency && <span>{currency}</span>}
      </span>
      {change !== undefined && (
        <>
          <span
            className={`${styles.stockChangeInfo} ${getChangeClass(change)}`}
          >
            {formatSignedNumber(change)}
          </span>
          {sparklineData.length > 0 && (
            <Sparklines
              data={sparklineData}
              limit={5}
              width={100}
              height={35}
              margin={5}
            >
              <SparklinesLine
                color={getSparklineColor()}
                style={{ fill: "none" }}
              />
            </Sparklines>
          )}
        </>
      )}
    </div>
  );
};

export default StockInfo;
