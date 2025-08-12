import Metric from "./metric.interface";

interface Stock {
  ticker: string;
  name: string;
  change?: number;
  price?: string;
  currency?: string;
  metric?: Metric;
}

export default Stock;
