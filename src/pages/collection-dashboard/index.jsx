import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import CollectionStats from './components/CollectionStats';
import CategoryFilter from './components/CategoryFilter';
import SortControls from './components/SortControls';
import CoinCard from './components/CoinCard';
import EmptyState from './components/EmptyState';
import FloatingActionButton from './components/FloatingActionButton';
import SearchOverlay from './components/SearchOverlay';

const CollectionDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock collection data
  const mockCoins = [
    {
      id: '1',
      name: '1947 Indian One Rupee',
      year: 1947,
      denomination: '₹1',
      country: 'India',
      condition: 'Very Fine',
      frontImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400',
      backImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400',
      isSpecial: true,
      estimatedValue: '₹2,500',
      category: 'special',
      dateAdded: '2024-07-10'
    },
    {
      id: '2',
      name: '2019 New ₹20 Coin',
      year: 2019,
      denomination: '₹20',
      country: 'India',
      condition: 'Uncirculated',
      frontImage: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?w=400',
      backImage: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?w=400',
      isSpecial: false,
      estimatedValue: '₹25',
      category: 'modern',
      dateAdded: '2024-07-08'
    },
    {
      id: '3',
      name: '1950 Two Annas',
      year: 1950,
      denomination: '2 Annas',
      country: 'India',
      condition: 'Fine',
      frontImage: 'https://images.pixabay.com/photo/2016/12/06/18/27/coins-1887414_1280.jpg?w=400',
      backImage: 'https://images.pixabay.com/photo/2016/12/06/18/27/coins-1887414_1280.jpg?w=400',
      isSpecial: true,
      estimatedValue: '₹150',
      category: 'special',
      dateAdded: '2024-07-05'
    },
    {
      id: '4',
      name: '2011 ₹5 Coin',
      year: 2011,
      denomination: '₹5',
      country: 'India',
      condition: 'Very Fine',
      frontImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      backImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      isSpecial: false,
      estimatedValue: '₹8',
      category: '5',
      dateAdded: '2024-07-03'
    },
    {
      id: '5',
      name: '2016 ₹2 Coin',
      year: 2016,
      denomination: '₹2',
      country: 'India',
      condition: 'Extremely Fine',
      frontImage: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?w=400',
      backImage: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?w=400',
      isSpecial: false,
      estimatedValue: '₹3',
      category: '2',
      dateAdded: '2024-07-01'
    },
    {
      id: '6',
      name: '2018 ₹1 Coin',
      year: 2018,
      denomination: '₹1',
      country: 'India',
      condition: 'Uncirculated',
      frontImage: 'https://images.pixabay.com/photo/2017/08/30/07/56/money-2696229_1280.jpg?w=400',
      backImage: 'https://images.pixabay.com/photo/2017/08/30/07/56/money-2696229_1280.jpg?w=400',
      isSpecial: false,
      estimatedValue: '₹2',
      category: '1',
      dateAdded: '2024-06-28'
    }
  ];

  const categories = [
    { id: 'all', label: 'All', count: mockCoins.length },
    { id: 'special', label: 'Special', count: mockCoins.filter(coin => coin.isSpecial).length },
    { id: '1', label: '₹1', count: mockCoins.filter(coin => coin.denomination === '₹1').length },
    { id: '2', label: '₹2', count: mockCoins.filter(coin => coin.denomination === '₹2').length },
    { id: '5', label: '₹5', count: mockCoins.filter(coin => coin.denomination === '₹5').length },
    { id: 'modern', label: 'Modern', count: mockCoins.filter(coin => coin.year >= 2000).length }
  ];

  const stats = {
    totalCoins: mockCoins.length,
    specialCoins: mockCoins.filter(coin => coin.isSpecial).length,
    recentAdditions: mockCoins.filter(coin => {
      const addedDate = new Date(coin.dateAdded);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - addedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    }).length
  };

  // Filter and sort coins
  const getFilteredAndSortedCoins = () => {
    let filtered = mockCoins;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.year.toString().includes(searchQuery) ||
        coin.denomination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.condition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'special') {
        filtered = filtered.filter(coin => coin.isSpecial);
      } else if (activeCategory === '1') {
        filtered = filtered.filter(coin => coin.denomination === '₹1');
      } else if (activeCategory === '2') {
        filtered = filtered.filter(coin => coin.denomination === '₹2');
      } else if (activeCategory === '5') {
        filtered = filtered.filter(coin => coin.denomination === '₹5');
      } else if (activeCategory === 'modern') {
        filtered = filtered.filter(coin => coin.year >= 2000);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'date-desc':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'date-asc':
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case 'denomination-asc':
          return parseFloat(a.denomination.replace('₹', '')) - parseFloat(b.denomination.replace('₹', ''));
        case 'denomination-desc':
          return parseFloat(b.denomination.replace('₹', '')) - parseFloat(a.denomination.replace('₹', ''));
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredCoins = getFilteredAndSortedCoins();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handle pull-to-refresh
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let isRefreshTriggered = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      
      if (diff > 100 && window.scrollY === 0 && !isRefreshTriggered) {
        isRefreshTriggered = true;
        handleRefresh();
      }
    };

    const handleTouchEnd = () => {
      isRefreshTriggered = false;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const getEmptyStateType = () => {
    if (searchQuery) return 'search';
    if (activeCategory !== 'all') return 'filter';
    return 'empty';
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <main className="lg:ml-60 pb-20 lg:pb-6">
        <div className="p-4 space-y-6">
          {/* Collection Statistics */}
          <CollectionStats stats={stats} />

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Sort Controls */}
          <SortControls
            sortBy={sortBy}
            onSortChange={handleSortChange}
            totalResults={filteredCoins.length}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          {/* Refresh Indicator */}
          {isRefreshing && (
            <div className="text-center py-4">
              <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Refreshing collection...</span>
              </div>
            </div>
          )}

          {/* Coins Grid/List */}
          {filteredCoins.length > 0 ? (
            <div className={
              viewMode === 'grid' ?'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' :'space-y-3'
            }>
              {filteredCoins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type={getEmptyStateType()}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomTabNavigation />

      {/* Search Overlay */}
      <SearchOverlay
        isVisible={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default CollectionDashboard;