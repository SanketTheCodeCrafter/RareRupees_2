import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AppPreferences = ({ settings, updateSetting }) => {
  const themeOptions = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'system', label: 'System Default' }
  ];

  const currencyOptions = [
    { value: 'INR', label: 'Indian Rupee (₹)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' }
  ];

  const measurementOptions = [
    { value: 'metric', label: 'Metric (mm, grams)' },
    { value: 'imperial', label: 'Imperial (inches, ounces)' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'value', label: 'Value (High to Low)' },
    { value: 'year', label: 'Year (Recent First)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिन्दी (Hindi)' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'fr', label: 'Français (French)' }
  ];

  return (
    <div className="space-y-6">
      {/* Display Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Display Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <Select
              value={settings.theme}
              onValueChange={(value) => updateSetting('theme', value)}
              options={themeOptions}
              placeholder="Select theme"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Choose your preferred color scheme
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Language
            </label>
            <Select
              value={settings.language}
              onValueChange={(value) => updateSetting('language', value)}
              options={languageOptions}
              placeholder="Select language"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Interface language (requires app restart)
            </p>
          </div>
        </div>
      </div>

      {/* Collection Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Collection Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Default Currency
            </label>
            <Select
              value={settings.currency}
              onValueChange={(value) => updateSetting('currency', value)}
              options={currencyOptions}
              placeholder="Select currency"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Primary currency for coin values and estimates
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Measurement Units
            </label>
            <Select
              value={settings.measurementUnit}
              onValueChange={(value) => updateSetting('measurementUnit', value)}
              options={measurementOptions}
              placeholder="Select units"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Units for coin dimensions and weight
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Default Sort Order
            </label>
            <Select
              value={settings.defaultSort}
              onValueChange={(value) => updateSetting('defaultSort', value)}
              options={sortOptions}
              placeholder="Select sort order"
            />
            <p className="text-xs text-muted-foreground mt-1">
              How coins are sorted in your collection by default
            </p>
          </div>
        </div>
      </div>

      {/* App Behavior */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">App Behavior</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Auto-save Changes</h4>
              <p className="text-sm text-muted-foreground">Automatically save form changes</p>
            </div>
            <button
              onClick={() => updateSetting('autoSave', !settings.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Show Tooltips</h4>
              <p className="text-sm text-muted-foreground">Display helpful hints and tips</p>
            </div>
            <button
              onClick={() => updateSetting('showTooltips', !settings.showTooltips)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showTooltips ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showTooltips ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Confirm Delete Actions</h4>
              <p className="text-sm text-muted-foreground">Show confirmation before deleting items</p>
            </div>
            <button
              onClick={() => updateSetting('confirmDeletes', !settings.confirmDeletes)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.confirmDeletes ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.confirmDeletes ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Backup & Sync */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Backup & Sync</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Cloud" size={20} className="text-blue-500" />
              <div>
                <h4 className="font-medium text-foreground">Auto Backup</h4>
                <p className="text-sm text-muted-foreground">Automatically backup your collection</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('autoBackup', !settings.autoBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoBackup ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Icon name="RefreshCw" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Last backup: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreferences;