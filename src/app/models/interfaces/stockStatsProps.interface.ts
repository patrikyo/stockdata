import Metrics from "./metrics.interface";

interface StockStatsProps {
  metrics: Metrics;
  currency: string | undefined;
}

export default StockStatsProps;
