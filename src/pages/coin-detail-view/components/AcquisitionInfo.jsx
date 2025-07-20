import React from 'react';
import Icon from '../../../components/AppIcon';

const AcquisitionInfo = ({ coinData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysOwned = (acquisitionDate) => {
    const acquired = new Date(acquisitionDate);
    const today = new Date();
    const diffTime = Math.abs(today - acquired);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysOwned = calculateDaysOwned(coinData.acquisitionDate);

  return (
    <div className="mx-6 mb-4 morphic-card">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="ShoppingBag" size={16} className="text-secondary" />
          </div>
          <h3 className="font-semibold text-card-foreground">Acquisition Details</h3>
        </div>

        <div className="space-y-3">
          {/* Acquisition Date */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Date Acquired</span>
            </div>
            <span className="text-sm font-medium text-card-foreground">
              {formatDate(coinData.acquisitionDate)}
            </span>
          </div>

          {/* Purchase Price */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon name="IndianRupee" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Purchase Price</span>
            </div>
            <span className="text-sm font-medium text-card-foreground font-mono">
              {coinData.acquisitionPrice}
            </span>
          </div>

          {/* Days Owned */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Days Owned</span>
            </div>
            <span className="text-sm font-medium text-card-foreground">
              {daysOwned} days
            </span>
          </div>

          {/* Value Appreciation */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-3 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Potential Gain</span>
              </div>
              <span className="text-sm font-bold text-success">
                ₹700 - ₹1,200
              </span>
            </div>
            <p className="text-xs text-success/80 mt-1">
              Based on current market estimates vs acquisition price
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcquisitionInfo;