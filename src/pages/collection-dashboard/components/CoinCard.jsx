import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CoinCard = ({ coin, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/coin-detail-view', { state: { coinId: coin.id } });
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'mint state': case'uncirculated':
        return 'text-success bg-success/10';
      case 'extremely fine': case'very fine':
        return 'text-warning bg-warning/10';
      case 'fine': case'very good':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="morphic-card p-4 cursor-pointer spring-bounce"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={coin.frontImage}
              alt={`${coin.name} front`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {coin.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-muted-foreground">
                {coin.year}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm font-medium text-primary">
                {coin.denomination}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getConditionColor(coin.condition)}`}>
                {coin.condition}
              </span>
              {coin.isSpecial && (
                <Icon name="Star" size={14} className="text-warning" />
              )}
            </div>
          </div>
          
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="morphic-card overflow-hidden cursor-pointer spring-bounce"
    >
      <div className="aspect-square bg-muted overflow-hidden relative">
        <Image
          src={coin.frontImage}
          alt={`${coin.name} front`}
          className="w-full h-full object-cover"
        />
        {coin.isSpecial && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
            <Icon name="Star" size={12} color="white" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-foreground text-sm truncate mb-1">
          {coin.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{coin.year}</span>
          <span className="font-medium text-primary">{coin.denomination}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${getConditionColor(coin.condition)}`}>
            {coin.condition}
          </span>
          {coin.estimatedValue && (
            <span className="text-xs font-medium text-success">
              {coin.estimatedValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;