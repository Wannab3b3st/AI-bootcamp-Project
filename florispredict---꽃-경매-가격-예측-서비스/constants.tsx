
import { PredictionData } from './types';

export const FLOWER_OPTIONS = [
  '프리지아', '국화', '장미', '튤립'
];

export const MOCK_PREDICTIONS: Record<string, PredictionData> = {
  '프리지아': {
    flowerName: '프리지아',
    maxPrice: 15400,
    avgPrice: 12800,
    minPrice: 9200,
    confidence: 0.94,
    trend: 'up',
    probabilities: {
      up: 68,
      stable: 22,
      down: 10
    },
    history: [
      { date: '05-01', maxPrice: 13500, avgPrice: 11000, minPrice: 8500 },
      { date: '05-02', maxPrice: 14200, avgPrice: 11500, minPrice: 9000 },
      { date: '05-03', maxPrice: 14800, avgPrice: 12200, minPrice: 9200 },
      { date: '05-04', maxPrice: 15100, avgPrice: 12500, minPrice: 9500 },
      { date: '05-05', maxPrice: 15400, avgPrice: 12800, minPrice: 9800 },
    ]
  },
  '국화': {
    flowerName: '국화',
    maxPrice: 8200,
    avgPrice: 6500,
    minPrice: 4800,
    confidence: 0.89,
    trend: 'down',
    probabilities: {
      up: 12,
      stable: 18,
      down: 70
    },
    history: [
      { date: '05-01', maxPrice: 8800, avgPrice: 7200, minPrice: 5500 },
      { date: '05-02', maxPrice: 8600, avgPrice: 7000, minPrice: 5300 },
      { date: '05-03', maxPrice: 8400, avgPrice: 6800, minPrice: 5000 },
      { date: '05-04', maxPrice: 8300, avgPrice: 6600, minPrice: 4900 },
      { date: '05-05', maxPrice: 8200, avgPrice: 6500, minPrice: 4800 },
    ]
  },
};
