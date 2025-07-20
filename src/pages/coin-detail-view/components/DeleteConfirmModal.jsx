import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ isVisible, coinName, onConfirm, onCancel }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4 animate-slide-up">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={24} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Delete Coin</h3>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this coin from your collection?
          </p>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm font-medium text-card-foreground">
              "{coinName}"
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;