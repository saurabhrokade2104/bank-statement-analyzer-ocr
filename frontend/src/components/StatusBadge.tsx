import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'small';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  const getStatusStyle = (status: string) => {
    const styles = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Queued': 'bg-gray-100 text-gray-800',
      'Ready': 'bg-green-100 text-green-800',
      'Uploading': 'bg-yellow-100 text-yellow-800',
      'Failed': 'bg-red-100 text-red-800',
      'Indexed': 'bg-green-100 text-green-800',
    };
    
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const sizeClass = variant === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs';

  return (
    <span className={`${getStatusStyle(status)} ${sizeClass} rounded-full font-medium`}>
      {status}
    </span>
  );
};

export default StatusBadge;