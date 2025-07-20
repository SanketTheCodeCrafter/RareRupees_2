import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange, totalResults, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'year-desc', label: 'Year (Newest First)' },
    { value: 'year-asc', label: 'Year (Oldest First)' },
    { value: 'date-desc', label: 'Recently Added' },
    { value: 'date-asc', label: 'Oldest Added' },
    { value: 'denomination-asc', label: 'Denomination (Low to High)' },
    { value: 'denomination-desc', label: 'Denomination (High to Low)' }
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="text-sm text-muted-foreground">
          {totalResults} coin{totalResults !== 1 ? 's' : ''}
        </div>
        
        <div className="w-px h-4 bg-border" />
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1 rounded spring-smooth ${
              viewMode === 'grid' ?'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1 rounded spring-smooth ${
              viewMode === 'list' ?'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>

      <div className="w-40">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          placeholder="Sort by..."
        />
      </div>
    </div>
  );
};

export default SortControls;