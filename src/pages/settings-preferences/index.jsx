import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import AccountSettings from './components/AccountSettings';
import AppPreferences from './components/AppPreferences';
import PrivacySecurity from './components/PrivacySecurity';
import SupportSection from './components/SupportSection';
import Icon from '../../components/AppIcon';

const SettingsPreferences = () => {
  const { user, userProfile, loading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    emailNotifications: true,
    pushNotifications: true,
    collectionUpdates: true,
    appAnnouncements: false,
    
    // App Preferences
    theme: 'system',
    currency: 'INR',
    measurementUnit: 'metric',
    defaultSort: 'newest',
    language: 'en',
    
    // Privacy & Security
    profileVisibility: 'public',
    collectionVisibility: 'private',
    showLocation: true,
    allowMessages: true,
    twoFactorEnabled: false
  });

  useEffect(() => {
    // Load user preferences from localStorage or API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.log('Error loading saved settings:', error);
      }
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/landing-page';
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const sections = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'preferences', label: 'App Preferences', icon: 'Settings' },
    { id: 'privacy', label: 'Privacy & Security', icon: 'Shield' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <AccountSettings
            userProfile={userProfile}
            settings={settings}
            updateSetting={updateSetting}
            onSignOut={handleSignOut}
          />
        );
      case 'preferences':
        return (
          <AppPreferences
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'privacy':
        return (
          <PrivacySecurity
            userProfile={userProfile}
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'support':
        return (
          <SupportSection userProfile={userProfile} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings & Preferences</h1>
          <p className="text-muted-foreground">
            Customize your RareRupees experience and manage your account settings.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="bg-card border border-border rounded-lg mb-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 min-w-max px-4 py-4 flex items-center justify-center space-x-2 border-b-2 transition-colors ${
                  activeSection === section.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Section Content */}
        <div className="space-y-6">
          {renderActiveSection()}
        </div>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default SettingsPreferences;