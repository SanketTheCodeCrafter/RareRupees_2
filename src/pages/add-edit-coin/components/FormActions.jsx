import React from 'react';
import Button from '../../../components/ui/Button';

const FormActions = ({ 
  isEdit = false,
  onSave,
  onCancel,
  onDelete,
  isLoading = false,
  isSaveDisabled = false,
  className = ""
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Primary Actions */}
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
          variant="default"
          onClick={onSave}
          loading={isLoading}
          disabled={isSaveDisabled || isLoading}
          className="flex-1 font-semibold"
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          {isEdit ? 'Update Coin' : 'Save Coin'}
        </Button>
      </div>

      {/* Delete Action (Edit Mode Only) */}
      {isEdit && (
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={isLoading}
          className="w-full"
          iconName="Trash2"
          iconPosition="left"
          iconSize={16}
        >
          Delete Coin
        </Button>
      )}
    </div>
  );
};

export default FormActions;