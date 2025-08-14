import Metrics from "@/app/models/interfaces/metrics.interface";
import StockStatsProps from "@/app/models/interfaces/stockStatsProps.interface";
import styles from "./StockStats.module.css";

const StockStats: React.FC<StockStatsProps> = ({ metrics }) => {
  return (
    <div>
      <h2>Metrics</h2>
      <dl className={styles.descriptionContainer}>
        {(Object.keys(metrics) as (keyof Metrics)[])
          .filter((key) => metrics[key])
          .map((key) => (
            <div className={styles.listContainer} key={key}>
              <dt>{key}:</dt>
              <dd>{metrics[key]}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
};

export default StockStats;
