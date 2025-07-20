import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordSection = ({ userEmail }) => {
  const { resetPassword } = useAuth();
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const handlePasswordReset = async () => {
    if (!userEmail) return;

    setResetLoading(true);
    setResetError(null);
    setResetSuccess(false);

    try {
      const result = await resetPassword(userEmail);

      if (result?.success) {
        setResetSuccess(true);
        setTimeout(() => {
          setResetSuccess(false);
          setShowPasswordSection(false);
        }, 5000);
      } else {
        setResetError(result?.error || 'Failed to send reset email');
      }
    } catch (error) {
      setResetError('Something went wrong. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Password & Security</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPasswordSection(!showPasswordSection)}
          iconName={showPasswordSection ? "ChevronUp" : "ChevronDown"}
        >
          {showPasswordSection ? 'Hide' : 'Manage'}
        </Button>
      </div>

      {showPasswordSection && (
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-blue-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">Change Password</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We will send you a secure password reset link to your email address.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={userEmail || ''}
                      disabled
                      className="bg-background"
                    />
                  </div>

                  <Button
                    onClick={handlePasswordReset}
                    loading={resetLoading}
                    iconName="Mail"
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Send Reset Link
                  </Button>
                </div>

                {resetSuccess && (
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-md flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm text-success">
                      Password reset link sent! Check your email inbox.
                    </span>
                  </div>
                )}

                {resetError && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-destructive" />
                    <span className="text-sm text-destructive">{resetError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lock" size={20} className="text-green-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">Account Security</h4>
                <p className="text-sm text-muted-foreground">
                  Your account is protected with email-based authentication. 
                  Always use a strong, unique password and keep your email secure.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Eye" size={20} className="text-purple-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">Privacy Settings</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Control what information is visible to other collectors.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Navigate to privacy settings')}
                  iconName="ExternalLink"
                >
                  Manage Privacy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordSection;