import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const isVisible = location.pathname === '/authentication-login-register';

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    navigate('/landing-page');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful authentication
      console.log(isLogin ? 'Login successful' : 'Registration successful', formData);
      
      // Navigate to dashboard
      navigate('/collection-dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setErrors({});
  };

  const handleSocialAuth = (provider) => {
    console.log(`${provider} authentication`);
    // Simulate social auth
    setTimeout(() => {
      navigate('/collection-dashboard');
    }, 1000);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full lg:w-auto lg:h-auto lg:max-w-md lg:mx-4 bg-card lg:rounded-lg lg:shadow-lg animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border lg:rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Coins" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-card-foreground">
                {isLogin ? 'Welcome Back' : 'Join RareRupees'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin ? 'Sign in to your account' : 'Create your collector account'}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="touch-target"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Social Authentication */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialAuth('Google')}
              className="w-full"
              disabled={isLoading}
            >
              <Icon name="Chrome" size={18} className="mr-2" />
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleSocialAuth('Apple')}
              className="w-full"
              disabled={isLoading}
            >
              <Icon name="Apple" size={18} className="mr-2" />
              Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                required
                disabled={isLoading}
              />
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
              disabled={isLoading}
            />

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                required
                disabled={isLoading}
              />
            )}

            {errors.submit && (
              <div className="text-sm text-error bg-error/10 border border-error/20 rounded-md p-3">
                {errors.submit}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-accent hover:text-accent/80 spring-smooth"
              disabled={isLoading}
            >
              {isLogin 
                ? "Don't have an account? Sign up" :"Already have an account? Sign in"
              }
            </button>
            
            {isLogin && (
              <div>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground spring-smooth"
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;