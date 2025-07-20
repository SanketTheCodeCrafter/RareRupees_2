import React from 'react';
import Input from '../../../components/ui/Input';

const ProfileEditForm = ({ profileData, onChange, userEmail }) => {
  const handleInputChange = (field, value) => {
    onChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="mt-8 bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Edit Profile Information</h3>
      
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <Input
            id="full_name"
            type="text"
            value={profileData?.full_name || ''}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full"
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={profileData?.username || ''}
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="Choose a unique username"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your username will be visible to other collectors
          </p>
        </div>

        {/* Email (Read-only) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={userEmail || ''}
            disabled
            className="w-full bg-muted"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Contact support to change your email address
          </p>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            value={profileData?.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell other collectors about yourself..."
            rows={4}
            maxLength={500}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {(profileData?.bio || '').length}/500 characters
          </p>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
            Location
          </label>
          <Input
            id="location"
            type="text"
            value={profileData?.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, Country"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Where are you based? This helps connect with local collectors
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;