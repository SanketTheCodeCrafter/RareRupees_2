import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import authService from '../../../utils/authService';

const AuthForm = ({ activeTab, onTabChange }) => {
  const { signIn, signUp, authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  // Check if we need to show resend confirmation option
  const urlParams = new URLSearchParams(location.search);
  const shouldShowResend = urlParams.get('resend') === 'true';

  React.useEffect(() => {
    if (shouldShowResend) {
      setNeedsConfirmation(true);
      setLocalError('Please confirm your email address. Check your email for the confirmation link.');
    }
  }, [shouldShowResend]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (localError) setLocalError(null);
    if (authError) clearError();
    if (successMessage) setSuccessMessage(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setLocalError('Email and password are required');
      return false;
    }

    if (activeTab === 'signup') {
      if (!formData.fullName.trim()) {
        setLocalError('Full name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setLocalError('Password must be at least 6 characters');
        return false;
      }
    }

    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setLocalError(null);
    setNeedsConfirmation(false);

    try {
      const result = await signIn(formData.email, formData.password);

      if (result?.success) {
        // Get the intended destination from location state or default to dashboard
        const from = location.state?.from?.pathname || '/collection-dashboard';
        navigate(from, { replace: true });
      } else if (result?.needsConfirmation) {
        setNeedsConfirmation(true);
        setLocalError(result?.error);
      } else {
        setLocalError(result?.error || 'Login failed');
      }
    } catch (error) {
      setLocalError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setLocalError(null);
    setSuccessMessage(null);

    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        username: formData.username
      });

      if (result?.success) {
        if (result?.message) {
          // Email confirmation required
          setSuccessMessage(result.message);
          setNeedsConfirmation(true);
          // Clear form
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            username: ''
          });
        } else {
          // Direct login (email confirmation not required)
          const from = location.state?.from?.pathname || '/collection-dashboard';
          navigate(from, { replace: true });
        }
      } else {
        setLocalError(result?.error || 'Signup failed');
      }
    } catch (error) {
      setLocalError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      setLocalError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setLocalError(null);

    try {
      const result = await authService.resendConfirmation(formData.email);
      
      if (result?.success) {
        setSuccessMessage(result?.message || 'Confirmation email sent successfully');
      } else {
        setLocalError(result?.error || 'Failed to resend confirmation email');
      }
    } catch (error) {
      setLocalError('Failed to resend confirmation email');
    } finally {
      setLoading(false);
    }
  };

  const currentError = localError || authError;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={activeTab === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
        {/* Email Confirmation Success/Error Messages */}
        {successMessage && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success">{successMessage}</span>
            </div>
          </div>
        )}

        {currentError && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-sm text-destructive">{currentError}</span>
            </div>
            
            {needsConfirmation && (
              <div className="mt-3 pt-3 border-t border-destructive/20">
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={loading}
                  className="text-sm text-primary hover:text-primary/80 underline"
                >
                  Resend Confirmation Email
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sign Up Fields */}
        {activeTab === 'signup' && (
          <>
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="text"
              placeholder="Username (optional)"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={loading}
            />
          </>
        )}

        {/* Email Field */}
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          disabled={loading}
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={loading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Confirm Password Field - Only for Sign Up */}
        {activeTab === 'signup' && (
          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
            disabled={loading}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>

        {/* Switch Between Forms */}
        <div className="text-center text-sm text-muted-foreground">
          {activeTab === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onTabChange('signup')}
                className="text-primary hover:text-primary/80 font-medium"
                disabled={loading}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onTabChange('signin')}
                className="text-primary hover:text-primary/80 font-medium"
                disabled={loading}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;