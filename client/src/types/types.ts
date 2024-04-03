export type GrowthIndex = {
  date: string; // date in YYYY-MM-DD format
  value: number; // growth index value
};

export type Chain = {
  tg_growth_index: Array<GrowthIndex>;
};

export type ChainsData = {
  blockchain: Chain;
  cumulative: Chain;
};

export type Granularity = "1 week" | "2 weeks" | "3 weeks" | "4 weeks";
