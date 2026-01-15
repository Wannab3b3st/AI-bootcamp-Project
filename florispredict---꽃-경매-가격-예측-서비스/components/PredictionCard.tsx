
import React from 'react';

interface PredictionCardProps {
  label: string;
  price: number;
  color: string;
  icon: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ label, price, color, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <i className={`fas ${icon} text-white text-xl`}></i>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-gray-900">
          ₩{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PredictionCard;
