
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface PriceChartProps {
  data: { date: string; maxPrice: number; avgPrice: number; minPrice: number }[];
  title?: string;
  hideTitle?: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, title, hideTitle = false }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {!hideTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{title || '이전 5회 경매 상세 동향'}</h3>
        </div>
      )}
      <div className="flex-1 w-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 11 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              tickFormatter={(value) => `${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              formatter={(value: number) => `₩${value.toLocaleString()}`}
            />
            {/* 내장 Legend 제거됨 - 부모 App.tsx에서 렌더링 */}
            
            <Line 
              name="최고가"
              type="monotone" 
              dataKey="maxPrice" 
              stroke="#f43f5e" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
            <Line 
              name="평균가"
              type="monotone" 
              dataKey="avgPrice" 
              stroke="#059669" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
            <Line 
              name="최저가"
              type="monotone" 
              dataKey="minPrice" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
