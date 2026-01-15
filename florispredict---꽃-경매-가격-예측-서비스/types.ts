
export interface PredictionData {
  flowerName: string;
  maxPrice: number;
  avgPrice: number;
  minPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  probabilities?: {
    up: number;
    stable: number;
    down: number;
  };
  history: { 
    date: string; 
    maxPrice: number; 
    avgPrice: number; 
    minPrice: number; 
  }[];
}

export interface MarketInsight {
  summary: string;
  factors: string[];
  recommendation: string;
}
