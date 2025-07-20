import React from 'react';
import Icon from '../../../components/AppIcon';

const CoinHeader = ({ coinData }) => {
  return (
    <div className="px-6 py-4 bg-card">
      <div className="space-y-3">
        {/* Main Title */}
        <div>
          <h1 className="text-2xl font-bold text-card-foreground leading-tight">
            {coinData.name}
          </h1>
          <div className="flex items-center space-x-3 mt-2">
            <span className="text-lg font-semibold text-primary">
              {coinData.year}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {coinData.country}
            </span>
          </div>
        </div>

        {/* Denomination and Value */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-secondary/20 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-secondary-foreground">
                {coinData.denomination}
              </span>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-primary">
                {coinData.condition}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Estimated Value</div>
            <div className="text-lg font-bold text-success">
              {coinData.estimatedValue}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Grade</div>
            <div className="font-semibold text-card-foreground font-mono">
              {coinData.grade}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Mint</div>
            <div className="font-semibold text-card-foreground">
              {coinData.mintMark}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Rarity</div>
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={i < 3 ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinHeader;