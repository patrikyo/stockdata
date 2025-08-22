import Metrics from "@/app/models/interfaces/metrics.interface";
import StockStatsProps from "@/app/models/interfaces/stockStatsProps.interface";
import styles from "./StockStats.module.css";
import {
  formatMetric,
  replaceNonAlphabeticWithSpace,
} from "@/app/utils/format";

const StockStats: React.FC<StockStatsProps> = ({ metrics, currency }) => {
  return (
    <div>
      <h2>Metrics</h2>
      <dl className={styles.descriptionContainer}>
        {(Object.keys(metrics) as (keyof Metrics)[])
          .filter((key) => metrics[key])
          .map((key) => (
            <div className={styles.listContainer} key={key}>
              <dt>{replaceNonAlphabeticWithSpace(key)}:</dt>
              <dd>{formatMetric(key, metrics[key] as number, currency)}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
};

export default StockStats;
