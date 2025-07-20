import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-foreground'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social login buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => onSocialLogin(provider.id)}
            disabled={isLoading}
            className="h-12 justify-center"
          >
            <Icon 
              name={provider.icon} 
              size={18} 
              className={`mr-2 ${provider.color}`} 
            />
            <span className="hidden sm:inline">{provider.name}</span>
            <span className="sm:hidden">{provider.name}</span>
          </Button>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center space-x-4 pt-4">
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Lock" size={14} className="text-success" />
          <span>Encrypted</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Eye" size={14} className="text-success" />
          <span>Private</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;