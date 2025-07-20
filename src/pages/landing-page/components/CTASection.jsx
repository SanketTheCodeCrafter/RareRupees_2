import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/authentication-login-register');
  };

  const handleLearnMore = () => {
    // Scroll to features section
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      id: 1,
      text: "Free to start with unlimited coin entries",
      icon: "Gift"
    },
    {
      id: 2,
      text: "Mobile-optimized for on-the-go cataloging",
      icon: "Smartphone"
    },
    {
      id: 3,
      text: "Secure cloud backup and sync",
      icon: "Shield"
    },
    {
      id: 4,
      text: "Expert community support",
      icon: "Users"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {/* Main CTA Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Sparkles" size={16} />
            <span>Start Your Digital Collection Today</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              Ready to Transform Your
              <span className="text-primary block">Coin Collection?</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of collectors who have already digitized their collections. 
              Start cataloging your coins today with our free mobile app.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className="flex items-center space-x-3 text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={benefit.icon} size={16} className="text-success" />
                </div>
                <span className="text-foreground font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="xl"
              onClick={handleGetStarted}
              iconName="ArrowRight"
              iconPosition="right"
              className="touch-target min-w-48"
            >
              Start Free Today
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={handleLearnMore}
              iconName="PlayCircle"
              iconPosition="left"
              className="touch-target min-w-48"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span>Setup in under 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span>100% secure & private</span>
            </div>
          </div>
        </div>

        {/* App Preview Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Quick Add Card */}
          <div className="morphic-card p-6 space-y-4 spring-smooth hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Plus" size={24} className="text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-card-foreground">Quick Add</h3>
              <p className="text-sm text-muted-foreground">
                Add coins in seconds with our streamlined interface
              </p>
            </div>
          </div>

          {/* Smart Search Card */}
          <div className="morphic-card p-6 space-y-4 spring-smooth hover:scale-105">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Search" size={24} className="text-accent" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-card-foreground">Smart Search</h3>
              <p className="text-sm text-muted-foreground">
                Find any coin instantly with powerful search filters
              </p>
            </div>
          </div>

          {/* Value Tracking Card */}
          <div className="morphic-card p-6 space-y-4 spring-smooth hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
              <Icon name="TrendingUp" size={24} className="text-success" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-card-foreground">Value Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your collection's worth and market trends
              </p>
            </div>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-left">
              <p className="font-semibold text-card-foreground">Ready to get started?</p>
              <p className="text-sm text-muted-foreground">
                Join 10,000+ collectors already using RareRupees
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/70 rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-success to-success/70 rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">+10K</span>
                </div>
              </div>
              <Button
                variant="default"
                onClick={handleGetStarted}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;