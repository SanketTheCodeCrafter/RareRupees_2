import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import ProfileEditForm from './components/ProfileEditForm';
import ProfileStats from './components/ProfileStats';
import PasswordSection from './components/PasswordSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserProfile = () => {
  const { user, userProfile, loading, authError, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    username: '',
    bio: '',
    location: '',
    avatar_url: ''
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        full_name: userProfile?.full_name || '',
        username: userProfile?.username || '',
        bio: userProfile?.bio || '',
        location: userProfile?.location || '',
        avatar_url: userProfile?.avatar_url || ''
      });
    }
  }, [userProfile]);

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const result = await updateProfile(profileData);

      if (result?.success) {
        setSaveSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(result?.error || 'Failed to update profile');
      }
    } catch (error) {
      setSaveError('Something went wrong updating your profile');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    if (userProfile) {
      setProfileData({
        full_name: userProfile?.full_name || '',
        username: userProfile?.username || '',
        bio: userProfile?.bio || '',
        location: userProfile?.location || '',
        avatar_url: userProfile?.avatar_url || ''
      });
    }
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
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

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Profile Header */}
        <ProfileHeader 
          userProfile={userProfile}
          profileData={profileData}
          isEditing={isEditing}
          onAvatarChange={(avatarUrl) => setProfileData(prev => ({ ...prev, avatar_url: avatarUrl }))}
        />

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 space-x-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              variant="outline"
              className="min-w-32"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button
                onClick={handleSaveProfile}
                loading={saveLoading}
                iconName="Check"
                className="min-w-28"
              >
                Save
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                iconName="X"
                className="min-w-28"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {saveSuccess && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-md flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success">Profile updated successfully!</span>
          </div>
        )}

        {(saveError || authError) && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <span className="text-sm text-destructive">{saveError || authError}</span>
          </div>
        )}

        {/* Profile Stats */}
        <ProfileStats userProfile={userProfile} />

        {/* Profile Edit Form */}
        {isEditing && (
          <ProfileEditForm
            profileData={profileData}
            onChange={setProfileData}
            userEmail={user?.email}
          />
        )}

        {/* Password Section */}
        <PasswordSection userEmail={user?.email} />

        {/* Account Information */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <p className="text-foreground">{user?.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="text-foreground">{userProfile?.username || 'Not set'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Type</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                {userProfile?.role || 'collector'}
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Member Since</label>
              <p className="text-foreground">
                {userProfile?.created_at 
                  ? new Date(userProfile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Unknown'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default UserProfile;