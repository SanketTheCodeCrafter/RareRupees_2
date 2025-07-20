import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ 
  isOpen,
  isEdit = false,
  coinName,
  onClose,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4 animate-slide-up">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">
              {isEdit ? 'Coin Updated' : 'Coin Added'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isEdit ? 'Changes saved successfully' : 'Added to your collection'}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          "{coinName}" has been {isEdit ? 'updated' : 'added to'} your collection.
        </p>
        
        <Button
          variant="default"
          onClick={onClose}
          className="w-full"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          View Collection
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;