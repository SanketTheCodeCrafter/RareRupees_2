import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchOverlay = ({ isVisible, onClose, onSearch, searchQuery, setSearchQuery }) => {
  const [recentSearches, setRecentSearches] = useState([
    '1947 coins',
    'British India',
    'Silver rupee',
    'Special coins'
  ]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleSearch = (query) => {
    if (query.trim()) {
      onSearch(query);
      // Add to recent searches if not already present
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 3)]);
      }
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-200 bg-background">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="touch-target"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <Input
            type="search"
            placeholder="Search your collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-muted/50 focus:bg-background"
            autoFocus
          />
        </form>
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Quick Filters */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Filters</h3>
          <div className="flex flex-wrap gap-2">
            {['Special Coins', 'Recent Additions', 'High Value', 'British India', 'Silver Coins'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleSearch(filter)}
                className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-full hover:bg-muted/80 spring-smooth"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Recent Searches</h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-muted rounded-lg spring-smooth"
                >
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Search Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <Icon name="Search" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Search by year, denomination, or country</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Filter" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Use filters to narrow down results</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Star" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Find special coins with "special" keyword</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;