import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/authentication-login-register');
  };

  const handleSignIn = () => {
    navigate('/authentication-login-register');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full px-4 py-16 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Logo and Brand */}
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Icon name="Coins" size={32} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">RareRupees</h1>
                  <p className="text-sm text-muted-foreground">Digital Coin Collection</p>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Your Coin Collection,
                  <span className="text-primary block">Digitally Organized</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Catalog, organize, and manage your precious coin collection with our mobile-first platform. 
                  Capture images, track details, and discover the true value of your treasures.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-2">
                    <Icon name="Camera" size={20} className="text-success" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Easy Capture</p>
                </div>
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-2">
                    <Icon name="Grid3X3" size={20} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Smart Organization</p>
                </div>
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-2">
                    <Icon name="TrendingUp" size={20} className="text-warning" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Value Tracking</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleGetStarted}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="touch-target"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSignIn}
                  iconName="LogIn"
                  iconPosition="left"
                  className="touch-target"
                >
                  Sign In
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Smartphone" size={16} className="text-accent" />
                  <span>Mobile Optimized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-warning" />
                  <span>Lightning Fast</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Phone Mockup */}
                <div className="w-80 h-96 mx-auto bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
                  {/* Phone Header */}
                  <div className="h-6 bg-muted/30 flex items-center justify-center">
                    <div className="w-16 h-1 bg-muted-foreground/30 rounded-full"></div>
                  </div>
                  
                  {/* App Interface */}
                  <div className="p-4 space-y-4">
                    {/* App Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                          <Icon name="Coins" size={16} color="white" />
                        </div>
                        <span className="font-semibold text-foreground">My Collection</span>
                      </div>
                      <Icon name="Search" size={20} className="text-muted-foreground" />
                    </div>

                    {/* Sample Coin Cards */}
                    <div className="space-y-3">
                      <div className="bg-background rounded-lg p-3 border border-border/50 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                            <Icon name="Coins" size={20} color="white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">1947 One Rupee</p>
                            <p className="text-xs text-muted-foreground">British India • VF</p>
                          </div>
                          <span className="text-xs font-mono text-success">₹2,500</span>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-3 border border-border/50 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                            <Icon name="Coins" size={20} color="white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">2010 ₹5 Coin</p>
                            <p className="text-xs text-muted-foreground">Republic India • UNC</p>
                          </div>
                          <span className="text-xs font-mono text-success">₹15</span>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-3 border border-border/50 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-copper-400 to-copper-600 rounded-full flex items-center justify-center">
                            <Icon name="Coins" size={20} color="white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">1835 East India</p>
                            <p className="text-xs text-muted-foreground">Company • Rare</p>
                          </div>
                          <span className="text-xs font-mono text-success">₹8,500</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-primary/5 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-primary">247</p>
                          <p className="text-xs text-muted-foreground">Total Coins</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-success">₹1,24,500</p>
                          <p className="text-xs text-muted-foreground">Collection Value</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Icon name="Camera" size={24} color="white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Icon name="Star" size={20} color="white" />
                </div>
              </div>

              {/* Background Decorations */}
              <div className="absolute top-8 right-8 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;