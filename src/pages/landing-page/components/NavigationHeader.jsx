import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleScrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Community", href: "#community" },
    { label: "Support", href: "#support" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation('/landing-page')}
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Coins" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              RareRupees
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleScrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground spring-smooth font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/authentication-login-register')}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              onClick={() => handleNavigation('/authentication-login-register')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden touch-target"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <nav className="space-y-3">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleScrollToSection(item.href)}
                    className="block w-full text-left py-2 text-muted-foreground hover:text-foreground spring-smooth font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleNavigation('/authentication-login-register')}
                  iconName="LogIn"
                  iconPosition="left"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleNavigation('/authentication-login-register')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Get Started Free
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Icon name="Mail" size={16} />
                  <span>support@rarerupees.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavigationHeader;