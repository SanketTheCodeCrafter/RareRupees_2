import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ isLogin, onToggle, isLoading }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      <Button
        variant={isLogin ? "default" : "ghost"}
        onClick={() => !isLogin && onToggle()}
        disabled={isLoading}
        className="flex-1 h-10"
      >
        Sign In
      </Button>
      <Button
        variant={!isLogin ? "default" : "ghost"}
        onClick={() => isLogin && onToggle()}
        disabled={isLoading}
        className="flex-1 h-10"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthTabs;