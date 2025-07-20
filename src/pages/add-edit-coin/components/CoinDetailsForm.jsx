import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CoinDetailsForm = ({ 
  formData, 
  onFormChange, 
  errors = {},
  disabled = false 
}) => {
  const denominationOptions = [
    { value: '', label: 'Select denomination' },
    { value: '1-paisa', label: '1 Paisa' },
    { value: '2-paisa', label: '2 Paisa' },
    { value: '5-paisa', label: '5 Paisa' },
    { value: '10-paisa', label: '10 Paisa' },
    { value: '20-paisa', label: '20 Paisa' },
    { value: '25-paisa', label: '25 Paisa' },
    { value: '50-paisa', label: '50 Paisa' },
    { value: '1-rupee', label: '₹1' },
    { value: '2-rupee', label: '₹2' },
    { value: '5-rupee', label: '₹5' },
    { value: '10-rupee', label: '₹10' },
    { value: '20-rupee', label: '₹20' },
    { value: 'custom', label: 'Other/Custom' }
  ];

  const conditionOptions = [
    { value: '', label: 'Select condition' },
    { value: 'poor', label: 'Poor (P-1)' },
    { value: 'fair', label: 'Fair (FR-2)' },
    { value: 'about-good', label: 'About Good (AG-3)' },
    { value: 'good', label: 'Good (G-4)' },
    { value: 'very-good', label: 'Very Good (VG-8)' },
    { value: 'fine', label: 'Fine (F-12)' },
    { value: 'very-fine', label: 'Very Fine (VF-20)' },
    { value: 'extremely-fine', label: 'Extremely Fine (EF-40)' },
    { value: 'about-uncirculated', label: 'About Uncirculated (AU-50)' },
    { value: 'uncirculated', label: 'Uncirculated (MS-60)' },
    { value: 'brilliant-uncirculated', label: 'Brilliant Uncirculated (MS-65)' }
  ];

  const mintLocationOptions = [
    { value: '', label: 'Select mint location' },
    { value: 'mumbai', label: 'Mumbai (Bombay)' },
    { value: 'kolkata', label: 'Kolkata (Calcutta)' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'noida', label: 'Noida' },
    { value: 'unknown', label: 'Unknown' },
    { value: 'foreign', label: 'Foreign Mint' }
  ];

  const rarityOptions = [
    { value: '', label: 'Select rarity' },
    { value: 'common', label: 'Common' },
    { value: 'uncommon', label: 'Uncommon' },
    { value: 'scarce', label: 'Scarce' },
    { value: 'rare', label: 'Rare' },
    { value: 'very-rare', label: 'Very Rare' },
    { value: 'extremely-rare', label: 'Extremely Rare' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1800; year--) {
    yearOptions.push({ value: year.toString(), label: year.toString() });
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        
        <Input
          label="Coin Name"
          type="text"
          placeholder="e.g., 1947 Indian One Rupee"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          required
          disabled={disabled}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Denomination"
            options={denominationOptions}
            value={formData.denomination || ''}
            onChange={(value) => handleInputChange('denomination', value)}
            error={errors.denomination}
            required
            disabled={disabled}
          />

          <Select
            label="Mint Year"
            options={[{ value: '', label: 'Select year' }, ...yearOptions]}
            value={formData.year || ''}
            onChange={(value) => handleInputChange('year', value)}
            error={errors.year}
            searchable
            required
            disabled={disabled}
          />
        </div>

        {formData.denomination === 'custom' && (
          <Input
            label="Custom Denomination"
            type="text"
            placeholder="Enter custom denomination"
            value={formData.customDenomination || ''}
            onChange={(e) => handleInputChange('customDenomination', e.target.value)}
            error={errors.customDenomination}
            required
            disabled={disabled}
          />
        )}
      </div>

      {/* Condition & Quality */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Condition & Quality</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Condition"
            options={conditionOptions}
            value={formData.condition || ''}
            onChange={(value) => handleInputChange('condition', value)}
            error={errors.condition}
            required
            disabled={disabled}
          />

          <Select
            label="Rarity"
            options={rarityOptions}
            value={formData.rarity || ''}
            onChange={(value) => handleInputChange('rarity', value)}
            error={errors.rarity}
            disabled={disabled}
          />
        </div>

        <Input
          label="Grade (Optional)"
          type="text"
          placeholder="e.g., MS-65, VF-30"
          value={formData.grade || ''}
          onChange={(e) => handleInputChange('grade', e.target.value)}
          error={errors.grade}
          disabled={disabled}
        />
      </div>

      {/* Mint Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Mint Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Mint Location"
            options={mintLocationOptions}
            value={formData.mintLocation || ''}
            onChange={(value) => handleInputChange('mintLocation', value)}
            error={errors.mintLocation}
            disabled={disabled}
          />

          <Input
            label="Mint Mark (Optional)"
            type="text"
            placeholder="e.g., B, C, H"
            value={formData.mintMark || ''}
            onChange={(e) => handleInputChange('mintMark', e.target.value)}
            error={errors.mintMark}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Additional Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Weight (grams)"
            type="number"
            step="0.01"
            placeholder="e.g., 11.66"
            value={formData.weight || ''}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            error={errors.weight}
            disabled={disabled}
          />

          <Input
            label="Diameter (mm)"
            type="number"
            step="0.1"
            placeholder="e.g., 30.6"
            value={formData.diameter || ''}
            onChange={(e) => handleInputChange('diameter', e.target.value)}
            error={errors.diameter}
            disabled={disabled}
          />
        </div>

        <Input
          label="Composition"
          type="text"
          placeholder="e.g., Silver (.500), Copper-Nickel"
          value={formData.composition || ''}
          onChange={(e) => handleInputChange('composition', e.target.value)}
          error={errors.composition}
          disabled={disabled}
        />

        <Input
          label="Catalog Number (Optional)"
          type="text"
          placeholder="e.g., KM# 557"
          value={formData.catalogNumber || ''}
          onChange={(e) => handleInputChange('catalogNumber', e.target.value)}
          error={errors.catalogNumber}
          disabled={disabled}
        />
      </div>

      {/* Notes & Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Notes & Tags</h3>
        
        <div className="space-y-4">
          <Input
            label="Tags (comma separated)"
            type="text"
            placeholder="e.g., Independence Era, Silver, British India"
            value={formData.tags || ''}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            error={errors.tags}
            description="Separate multiple tags with commas"
            disabled={disabled}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Notes (Optional)
            </label>
            <textarea
              placeholder="Add any additional notes about this coin..."
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              disabled={disabled}
              className="w-full min-h-24 px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              rows={4}
            />
            {errors.notes && (
              <p className="text-sm text-error">{errors.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsForm;