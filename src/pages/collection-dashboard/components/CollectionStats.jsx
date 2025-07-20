import React from 'react';
import Icon from '../../../components/AppIcon';

const CollectionStats = ({ stats }) => {
  const statCards = [
    {
      id: 'total',
      title: 'Total Coins',
      value: stats.totalCoins,
      icon: 'Coins',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'special',
      title: 'Special Coins',
      value: stats.specialCoins,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'recent',
      title: 'Added This Month',
      value: stats.recentAdditions,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {statCards.map((stat) => (
        <div
          key={stat.id}
          className="morphic-card p-4 text-center"
        >
          <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
            <Icon name={stat.icon} size={20} className={stat.color} />
          </div>
          <div className="text-lg font-semibold text-foreground">
            {stat.value}
          </div>
          <div className="text-xs text-muted-foreground">
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionStats;