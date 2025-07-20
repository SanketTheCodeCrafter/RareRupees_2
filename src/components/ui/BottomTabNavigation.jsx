import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = !location.pathname.includes('/landing-page') && 
                         !location.pathname.includes('/authentication-login-register');

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    {
      id: 'collection',
      label: 'Collection',
      icon: 'Grid3X3',
      path: '/collection-dashboard',
      isActive: location.pathname === '/collection-dashboard'
    },
    {
      id: 'add',
      label: 'Add Coin',
      icon: 'Plus',
      path: '/add-edit-coin',
      isActive: location.pathname === '/add-edit-coin'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/profile',
      isActive: location.pathname === '/profile'
    }
  ];

  const handleTabPress = (tab) => {
    navigate(tab.path);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => handleTabPress(tab)}
              className={`flex-1 flex flex-col items-center space-y-1 py-2 px-1 touch-target spring-smooth ${
                tab.isActive 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={tab.icon} 
                size={20} 
                className={tab.isActive ? 'text-primary' : 'text-current'}
              />
              <span className="text-xs font-medium leading-none">
                {tab.label}
              </span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-60 lg:bg-card lg:border-r lg:border-border lg:z-100">
        <div className="flex flex-col w-full p-4 space-y-2">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Navigation
            </h2>
          </div>
          
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={tab.isActive ? "secondary" : "ghost"}
              onClick={() => handleTabPress(tab)}
              className={`w-full justify-start space-x-3 py-3 px-4 spring-smooth ${
                tab.isActive 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon 
                name={tab.icon} 
                size={20} 
                className={tab.isActive ? 'text-secondary-foreground' : 'text-current'}
              />
              <span className="font-medium">
                {tab.label}
              </span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Content Spacer for Mobile */}
      <div className="lg:hidden h-18" />
      
      {/* Content Spacer for Desktop */}
      <div className="hidden lg:block lg:w-60" />
    </>
  );
};

export default BottomTabNavigation;