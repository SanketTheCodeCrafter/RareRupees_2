import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userProfile, profileData, isEditing, onAvatarChange }) => {
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const displayName = isEditing ? profileData?.full_name : userProfile?.full_name;
  const displayUsername = isEditing ? profileData?.username : userProfile?.username;
  const displayBio = isEditing ? profileData?.bio : userProfile?.bio;
  const displayLocation = isEditing ? profileData?.location : userProfile?.location;
  const avatarUrl = isEditing ? profileData?.avatar_url : userProfile?.avatar_url;

  const handleAvatarSelect = (newAvatarUrl) => {
    if (isEditing && onAvatarChange) {
      onAvatarChange(newAvatarUrl);
    }
    setShowAvatarOptions(false);
  };

  const avatarOptions = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150'
  ];

  return (
    <div className="text-center">
      {/* Avatar Section */}
      <div className="relative inline-block">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-background shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Fallback Avatar */}
          <div 
            className={`w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg ${
              avatarUrl ? 'hidden' : 'flex'
            }`}
          >
            <Icon name="User" size={32} color="white" />
          </div>

          {/* Edit Avatar Button */}
          {isEditing && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-md"
              onClick={() => setShowAvatarOptions(!showAvatarOptions)}
            >
              <Icon name="Camera" size={14} />
            </Button>
          )}
        </div>

        {/* Avatar Selection Modal */}
        {showAvatarOptions && isEditing && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
            <div className="bg-popover border border-border rounded-lg shadow-lg p-4 w-80">
              <h4 className="text-sm font-medium text-foreground mb-3">Choose Avatar</h4>
              <div className="grid grid-cols-3 gap-3">
                {avatarOptions.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect(url)}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors"
                  >
                    <img
                      src={url}
                      alt={`Avatar option ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="mt-3 flex justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAvatarSelect('')}
                >
                  Remove
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAvatarOptions(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {displayName || 'No Name'}
        </h1>
        
        {displayUsername && (
          <p className="text-muted-foreground">@{displayUsername}</p>
        )}
        
        {displayBio && (
          <p className="text-foreground max-w-md mx-auto leading-relaxed">
            {displayBio}
          </p>
        )}
        
        {displayLocation && (
          <div className="flex items-center justify-center space-x-1 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{displayLocation}</span>
          </div>
        )}
      </div>

      {/* Backdrop for avatar modal */}
      {showAvatarOptions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowAvatarOptions(false)}
        />
      )}
    </div>
  );
};

export default ProfileHeader;