import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import AuthForm from './components/AuthForm';
import SocialLogin from './components/SocialLogin';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, authError, clearError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setLocalError('');
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setLocalError('');
    clearError();

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, {
          fullName: formData.fullName,
          username: formData.username || formData.email.split('@')[0]
        });
      }

      if (result?.success) {
        navigate('/collection-dashboard');
      } else {
        setLocalError(result?.error || 'Authentication failed');
      }
    } catch (error) {
      setLocalError('Something went wrong. Please try again.');
      console.log('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setLocalError('');
    clearError();
    
    try {
      // Note: Social login will redirect, so no need to handle response here
      console.log(`Initiating ${provider} authentication...`);
      // In a real implementation, you would call authService.signInWithProvider(provider)
      setLocalError(`${provider} login is not configured yet. Please use email/password authentication.`);
    } catch (error) {
      setLocalError(`${provider} login failed. Please try again.`);
      console.log('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = authError || localError;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AuthHeader />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Tab Navigation */}
          <AuthTabs 
            isLogin={isLogin}
            onToggle={handleToggleMode}
            isLoading={isLoading}
          />

          {/* Error Display */}
          {displayError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          {/* Authentication Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border/50 p-6 mb-6">
            <AuthForm
              isLogin={isLogin}
              onToggleMode={handleToggleMode}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Social Login */}
          <div className="bg-card rounded-lg shadow-sm border border-border/50 p-6">
            <SocialLogin
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />
          </div>

          {/* Terms and Privacy */}
          <div className="text-center mt-6 px-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By continuing, you agree to our{' '}
              <button className="text-accent hover:text-accent/80 spring-smooth">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-accent hover:text-accent/80 spring-smooth">
                Privacy Policy
              </button>
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/30">
            <div className="text-center">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Demo Credentials (Supabase Test Data)
              </h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Email: collector@rarerupees.com</p>
                <p>Password: collect123</p>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>or create a new account to get started</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100 flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
              <span className="text-sm font-medium text-foreground">
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;