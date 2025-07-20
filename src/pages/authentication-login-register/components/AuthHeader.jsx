import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/landing-page');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="touch-target"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Icon name="Coins" size={20} color="white" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            RareRupees
          </span>
        </div>

        {/* Spacer for balance */}
        <div className="w-10" />
      </div>
    </header>
  );
};

export default AuthHeader;