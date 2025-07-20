import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ 
  isOpen,
  coinName,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  if (!isOpen) return null;

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
          <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Delete Coin</h3>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete "{coinName}" from your collection?
        </p>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;