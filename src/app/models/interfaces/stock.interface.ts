import Metrics from "./metrics.interface";

interface Stock {
  ticker: string;
  name: string;
  change?: number;
  price?: string;
  currency?: string;
  metrics?: Metrics;
  priceHistory: number[];
}

export default Stock;
