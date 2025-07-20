import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
// Add your imports here
import LandingPage from "pages/landing-page";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import CoinDetailView from "pages/coin-detail-view";
import AddEditCoin from "pages/add-edit-coin";
import CollectionDashboard from "pages/collection-dashboard";
import UserProfile from "pages/user-profile";
import SettingsPreferences from "pages/settings-preferences";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        
        {/* Protected routes - require authentication and email confirmation */}
        <Route 
          path="/collection-dashboard" 
          element={
            <ProtectedRoute>
              <CollectionDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings-preferences" 
          element={
            <ProtectedRoute>
              <SettingsPreferences />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/coin-detail-view" 
          element={
            <ProtectedRoute>
              <CoinDetailView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-edit-coin" 
          element={
            <ProtectedRoute>
              <AddEditCoin />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;