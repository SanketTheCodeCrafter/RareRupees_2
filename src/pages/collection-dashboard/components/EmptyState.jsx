import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'empty', searchQuery = '' }) => {
  const navigate = useNavigate();

  const handleAddCoin = () => {
    navigate('/add-edit-coin');
  };

  if (type === 'search') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No coins found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          We couldn't find any coins matching "{searchQuery}". Try adjusting your search terms or filters.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Clear Search
        </Button>
      </div>
    );
  }

  if (type === 'filter') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Filter" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No coins in this category
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You don't have any coins in this category yet. Start building your collection!
        </p>
        <Button onClick={handleAddCoin} iconName="Plus" iconPosition="left">
          Add Your First Coin
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Icon name="Coins" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Start Your Collection
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        Welcome to RareRupees! Begin your numismatic journey by adding your first coin to the collection.
      </p>
      <Button onClick={handleAddCoin} iconName="Plus" iconPosition="left" size="lg">
        Add Your First Coin
      </Button>
      
      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Camera" size={20} className="text-secondary" />
          </div>
          <p className="text-xs text-muted-foreground">
            Capture with camera
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Upload" size={20} className="text-accent" />
          </div>
          <p className="text-xs text-muted-foreground">
            Upload photos
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;