import React, { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ userProfile }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCoins: 0,
    specialCoins: 0,
    collections: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchStats = async () => {
      try {
        // Get total coins count
        const { count: totalCoins } = await supabase
          .from('coins')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Get special coins count
        const { count: specialCoins } = await supabase
          .from('coins')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('is_special', true);

        // Get collections count
        const { count: collections } = await supabase
          .from('coin_collections')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Get total estimated value
        const { data: valueData } = await supabase
          .from('coins')
          .select('estimated_value_min, estimated_value_max')
          .eq('user_id', user.id)
          .not('estimated_value_min', 'is', null);

        let totalValue = 0;
        if (valueData?.length > 0) {
          totalValue = valueData.reduce((sum, coin) => {
            const avgValue = ((coin.estimated_value_min || 0) + (coin.estimated_value_max || 0)) / 2;
            return sum + avgValue;
          }, 0);
        }

        setStats({
          totalCoins: totalCoins || 0,
          specialCoins: specialCoins || 0,
          collections: collections || 0,
          totalValue
        });
      } catch (error) {
        console.log('Error fetching profile stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="w-8 h-8 bg-muted rounded animate-pulse mx-auto mb-2"></div>
              <div className="w-12 h-4 bg-muted rounded animate-pulse mx-auto mb-1"></div>
              <div className="w-16 h-3 bg-muted rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    } else {
      return `₹${value.toFixed(0)}`;
    }
  };

  const statItems = [
    {
      icon: 'Coins',
      value: stats.totalCoins,
      label: 'Total Coins',
      color: 'text-blue-500'
    },
    {
      icon: 'Star',
      value: stats.specialCoins,
      label: 'Special Coins',
      color: 'text-yellow-500'
    },
    {
      icon: 'FolderOpen',
      value: stats.collections,
      label: 'Collections',
      color: 'text-green-500'
    },
    {
      icon: 'TrendingUp',
      value: formatCurrency(stats.totalValue),
      label: 'Est. Value',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="mt-8 bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Collection Statistics</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statItems.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border mb-3 ${stat.color}`}>
              <Icon name={stat.icon} size={18} />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;