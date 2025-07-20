import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GlobalHeader from './ui/GlobalHeader';
import BottomTabNavigation from './ui/BottomTabNavigation';

const ProtectedRoute = ({ children }) => {
  const { user, userProfile, loading, authError } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
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

  // Check if user is authenticated
  if (!user) {
    // Redirect to authentication page with return path
    return <Navigate to="/authentication-login-register" state={{ from: location }} replace />;
  }

  // Check if user's email is confirmed
  if (user && !user?.email_confirmed_at) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Email Confirmation Required
              </h2>
              <p className="text-muted-foreground mb-6">
                Please check your email and click the confirmation link to access your account.
                We sent a confirmation email to <strong>{user?.email}</strong>.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                I've Confirmed - Refresh Page
              </button>
              
              <button
                onClick={() => {
                  // Redirect to auth page to resend confirmation
                  window.location.href = '/authentication-login-register?resend=true';
                }}
                className="w-full border border-border text-foreground px-4 py-2 rounded-md hover:bg-muted transition-colors"
              >
                Resend Confirmation Email
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Not seeing the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  // Check if user profile exists (might be null during profile creation)
  if (user?.email_confirmed_at && !userProfile && !authError) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Setting up your profile...</p>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  // User is authenticated and confirmed - render the protected content
  return children;
};

export default ProtectedRoute;