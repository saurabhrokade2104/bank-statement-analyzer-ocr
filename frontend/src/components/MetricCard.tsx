import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  bgColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  bgColor = 'bg-white'
}) => {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`${bgColor} rounded-xl shadow-sm border border-gray-200 p-6`}>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${getChangeColor(changeType)}`}>
          {change}
        </p>
      )}
    </div>
  );
};

export default MetricCard;