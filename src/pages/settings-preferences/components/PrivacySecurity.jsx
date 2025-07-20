import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PrivacySecurity = ({ userProfile, settings, updateSetting }) => {
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

  const visibilityOptions = [
    { value: 'public', label: 'Public (Anyone can view)' },
    { value: 'collectors', label: 'Collectors Only' },
    { value: 'private', label: 'Private (Only me)' }
  ];

  const handleTwoFactorToggle = () => {
    if (settings.twoFactorEnabled) {
      updateSetting('twoFactorEnabled', false);
    } else {
      setShowTwoFactorSetup(true);
    }
  };

  const handleTwoFactorSetup = () => {
    // TODO: Implement 2FA setup
    updateSetting('twoFactorEnabled', true);
    setShowTwoFactorSetup(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Privacy</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Profile Visibility
            </label>
            <Select
              value={settings.profileVisibility}
              onValueChange={(value) => updateSetting('profileVisibility', value)}
              options={visibilityOptions}
              placeholder="Select visibility"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Control who can view your profile information
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Collection Visibility
            </label>
            <Select
              value={settings.collectionVisibility}
              onValueChange={(value) => updateSetting('collectionVisibility', value)}
              options={visibilityOptions}
              placeholder="Select visibility"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Who can view your coin collection
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Show Location</h4>
              <p className="text-sm text-muted-foreground">Display your location on your profile</p>
            </div>
            <button
              onClick={() => updateSetting('showLocation', !settings.showLocation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showLocation ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showLocation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Allow Messages</h4>
              <p className="text-sm text-muted-foreground">Let other collectors send you messages</p>
            </div>
            <button
              onClick={() => updateSetting('allowMessages', !settings.allowMessages)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.allowMessages ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.allowMessages ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={settings.twoFactorEnabled ? "ShieldCheck" : "Shield"} 
                size={20} 
                className={settings.twoFactorEnabled ? "text-green-500" : "text-muted-foreground"} 
              />
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  {settings.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                </p>
              </div>
            </div>
            <Button
              variant={settings.twoFactorEnabled ? "destructive" : "outline"}
              size="sm"
              onClick={handleTwoFactorToggle}
            >
              {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Key" size={20} className="text-blue-500" />
              <div>
                <h4 className="font-medium text-foreground">Password</h4>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Navigate to password change')}
            >
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-purple-500" />
              <div>
                <h4 className="font-medium text-foreground">Active Sessions</h4>
                <p className="text-sm text-muted-foreground">Manage your login sessions</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Manage sessions')}
            >
              View
            </Button>
          </div>
        </div>
      </div>

      {/* Data Control */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Control</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={20} className="text-green-500" />
              <div>
                <h4 className="font-medium text-foreground">Download Your Data</h4>
                <p className="text-sm text-muted-foreground">Get a copy of your account data</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Download data')}
            >
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Trash2" size={20} className="text-destructive" />
              <div>
                <h4 className="font-medium text-destructive">Delete All Data</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => console.log('Delete account')}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Information</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-2">How We Use Your Data</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your data is used to provide and improve the RareRupees service. 
                  We never sell your personal information to third parties. 
                  Your collection data is only shared according to your privacy settings.
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 p-0 h-auto"
                  onClick={() => console.log('Open privacy policy')}
                >
                  Read Full Privacy Policy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Shield" size={24} className="text-blue-500" />
              <h3 className="text-lg font-semibold text-foreground">Enable Two-Factor Authentication</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Two-factor authentication adds an extra layer of security to your account. 
              You will receive a verification code via email when signing in.
            </p>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleTwoFactorSetup}
                className="flex-1"
              >
                Enable 2FA
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTwoFactorSetup(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySecurity;