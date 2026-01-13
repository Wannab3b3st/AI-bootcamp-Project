
export enum MarketStatus {
  BULL = 'BULL',
  STABLE = 'STABLE',
  RISK = 'RISK'
}

export interface PricePoint {
  max_price: number;
  mean_price: number;
  min_price: number;
}

export interface ForecastData {
  t1: PricePoint;
  t3: PricePoint;
  t5: PricePoint;
}

export interface MarketMetrics {
  premium_ratio: number;     // max_amount / mean
  spread: number;            // max - min
  low_pressure: number;      // mean - min (Dumping Risk)
  unit_price: number;        // mean (사용자 리스트의 mean)
  ma_amount: number;         // 이동평균 물량 (사용자 리스트의 ma_amount)
  total_quantity: number;    // 현재 총 물량
}

export interface MarketState {
  selectedMarket: string;
  selectedCategory: string;
  currentStatus: MarketStatus;
  currentMetrics: MarketMetrics;
  forecast: ForecastData;
  farmerScore: number;
  buyerScore: number;
  timestamp: string;
  modelMetrics: {
    mae: number;
    rmse: number;
  };
}
