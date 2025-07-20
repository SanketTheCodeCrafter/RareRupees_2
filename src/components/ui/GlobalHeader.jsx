import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isAuthenticated = !location.pathname.includes('/landing-page') && 
                         !location.pathname.includes('/authentication-login-register');

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/collection-dashboard':
        return 'My Collection';
      case '/add-edit-coin':
        return 'Add Coin';
      case '/coin-detail-view':
        return 'Coin Details';
      default:
        return 'RareRupees';
    }
  };

  const handleBack = () => {
    if (location.pathname === '/coin-detail-view') {
      navigate('/collection-dashboard');
    } else if (location.pathname === '/add-edit-coin') {
      navigate('/collection-dashboard');
    } else {
      navigate(-1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setShowSearch(false);
  };

  const handleProfileAction = (action) => {
    setShowProfileMenu(false);
    switch (action) {
      case 'profile': navigate('/user-profile');
        break;
      case 'settings': navigate('/settings-preferences');
        break;
      case 'logout': navigate('/landing-page');
        break;
      default:
        break;
    }
  };

  return (
    <header className="sticky top-0 z-100 bg-background border-b border-border/50 safe-area-top">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && location.pathname !== '/collection-dashboard' ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="touch-target"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          ) : null}
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate(isAuthenticated ? '/collection-dashboard' : '/landing-page')}
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Coins" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:block">
              RareRupees
            </span>
          </div>
        </div>

        {/* Center Section - Page Title */}
        {isAuthenticated && (
          <div className="flex-1 text-center">
            <h1 className="text-base font-medium text-foreground truncate max-w-48">
              {getPageTitle()}
            </h1>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {isAuthenticated && (
            <>
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
                className="touch-target"
              >
                <Icon name="Search" size={20} />
              </Button>

              {/* Profile Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="touch-target"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} color="white" />
                  </div>
                </Button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-200">
                    <div className="py-1">
                      <button
                        onClick={() => handleProfileAction('profile')}
                        className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2"
                      >
                        <Icon name="User" size={16} />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => handleProfileAction('settings')}
                        className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </button>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={() => handleProfileAction('logout')}
                        className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted flex items-center space-x-2"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && isAuthenticated && (
        <div className="px-4 pb-3 border-t border-border/50 bg-background">
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-3">
            <div className="flex-1 relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search your collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                autoFocus
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      {/* Backdrop for profile menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-60"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default GlobalHeader;