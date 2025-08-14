interface Metrics {
  marketCap: number | "N/A";
  pbRatio: number | "N/A";
  pegRatio: number | "N/A";
  psRatio: number | "N/A";
  enterpriseValue: number | "N/A";
  forwardPE: number | "N/A";
  trailingPE: number | "N/A";
  shortSelling: string | "N/A";
}

export default Metrics;
