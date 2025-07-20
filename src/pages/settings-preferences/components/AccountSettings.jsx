import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSettings = ({ userProfile, settings, updateSetting, onSignOut }) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  const handleExportData = () => {
    // TODO: Implement data export functionality
    console.log('Export user data');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Delete account');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Management</h3>
        
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Icon name="User" size={18} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{userProfile?.full_name || 'Update Profile'}</h4>
              <p className="text-sm text-muted-foreground">
                {userProfile?.username ? `@${userProfile.username}` : 'Set your username and bio'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleProfileClick}
            iconName="Edit"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <button
              onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Collection Updates</h4>
              <p className="text-sm text-muted-foreground">Notifications about your coin collection</p>
            </div>
            <button
              onClick={() => updateSetting('collectionUpdates', !settings.collectionUpdates)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.collectionUpdates ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.collectionUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">App Announcements</h4>
              <p className="text-sm text-muted-foreground">News and updates from RareRupees</p>
            </div>
            <button
              onClick={() => updateSetting('appAnnouncements', !settings.appAnnouncements)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.appAnnouncements ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.appAnnouncements ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={20} className="text-blue-500" />
              <div>
                <h4 className="font-medium text-foreground">Export Data</h4>
                <p className="text-sm text-muted-foreground">Download your collection data</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              iconName="Download"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Actions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="LogOut" size={20} className="text-orange-500" />
              <div>
                <h4 className="font-medium text-foreground">Sign Out</h4>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onSignOut}
              iconName="LogOut"
            >
              Sign Out
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Trash2" size={20} className="text-destructive" />
              <div>
                <h4 className="font-medium text-destructive">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              This action cannot be undone. All your coins, collections, and account data will be permanently deleted.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="flex-1"
              >
                Yes, Delete Account
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
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

export default AccountSettings;