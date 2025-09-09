interface Metrics {
  enterprise_value: number;
  ev_ebitda: number;
  ev_revenue: number;
  forward_pe: number;
  market_cap: number;
  pb_ratio: number;
  peg_ratio: number | null;
  ps_ratio: number;
  trailing_pe: number;
}

export default Metrics;
