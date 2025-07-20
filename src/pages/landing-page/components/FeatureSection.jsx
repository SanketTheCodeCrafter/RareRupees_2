import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      icon: "Camera",
      title: "Smart Image Capture",
      description: "Capture high-quality photos of your coins with our built-in camera. Front and back images with automatic enhancement for clear documentation.",
      benefits: ["Auto-focus technology", "Image enhancement", "Multiple angles"],
      color: "success"
    },
    {
      id: 2,
      icon: "Grid3X3",
      title: "Intelligent Organization",
      description: "Organize your collection with smart categorization. Filter by denomination, year, condition, and custom tags for instant access.",
      benefits: ["Smart categorization", "Advanced filtering", "Custom tags"],
      color: "accent"
    },
    {
      id: 3,
      icon: "Search",
      title: "Advanced Search & Filter",
      description: "Find any coin instantly with powerful search capabilities. Filter by multiple criteria and sort by various parameters.",
      benefits: ["Multi-criteria search", "Smart suggestions", "Quick filters"],
      color: "warning"
    },
    {
      id: 4,
      icon: "TrendingUp",
      title: "Value Tracking",
      description: "Track the estimated value of your collection over time. Get insights into market trends and investment potential.",
      benefits: ["Market value tracking", "Investment insights", "Trend analysis"],
      color: "primary"
    },
    {
      id: 5,
      icon: "Shield",
      title: "Secure & Private",
      description: "Your collection data is encrypted and stored securely. Complete privacy with local data storage options available.",
      benefits: ["End-to-end encryption", "Privacy focused", "Secure backup"],
      color: "destructive"
    },
    {
      id: 6,
      icon: "Smartphone",
      title: "Mobile-First Design",
      description: "Designed specifically for mobile collectors. Touch-friendly interface with smooth animations and intuitive navigation.",
      benefits: ["Touch optimized", "Smooth animations", "Offline capable"],
      color: "secondary"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: "text-success bg-success/10 border-success/20",
      accent: "text-accent bg-accent/10 border-accent/20",
      warning: "text-warning bg-warning/10 border-warning/20",
      primary: "text-primary bg-primary/10 border-primary/20",
      destructive: "text-destructive bg-destructive/10 border-destructive/20",
      secondary: "text-secondary bg-secondary/10 border-secondary/20"
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Sparkles" size={16} />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Everything You Need to Manage
            <span className="text-primary block">Your Coin Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From capturing images to tracking values, RareRupees provides all the tools 
            serious collectors need in one beautiful, mobile-first application.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="morphic-card p-6 space-y-4 spring-smooth hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Feature Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(feature.color)}`}>
                <Icon name={feature.icon} size={24} className={`text-${feature.color}`} />
              </div>

              {/* Feature Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Benefits */}
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className={`text-${feature.color}`} />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Feature Image */}
          <div className="relative">
            <div className="relative z-10 bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
              {/* Mock App Interface */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-card-foreground">Add New Coin</h4>
                  <Icon name="X" size={20} className="text-muted-foreground" />
                </div>

                {/* Image Upload Area */}
                <div className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Camera" size={24} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-card-foreground">Capture Coin Image</p>
                    <p className="text-sm text-muted-foreground">Tap to take photo</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Coin Name</label>
                    <div className="mt-1 p-3 bg-input border border-border rounded-md">
                      <span className="text-muted-foreground">1947 One Rupee</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-card-foreground">Year</label>
                      <div className="mt-1 p-3 bg-input border border-border rounded-md">
                        <span className="text-muted-foreground">1947</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-card-foreground">Condition</label>
                      <div className="mt-1 p-3 bg-input border border-border rounded-md">
                        <span className="text-muted-foreground">Very Fine</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
          </div>

          {/* Right - Feature Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Zap" size={14} />
                <span>Quick & Easy</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Add Coins in Seconds,
                <span className="text-primary block">Not Minutes</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our streamlined interface makes adding new coins to your collection incredibly fast. 
                Just snap a photo, fill in the details, and you're done.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Capture Images</h4>
                  <p className="text-sm text-muted-foreground">Take photos of both sides with our guided camera</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Add Details</h4>
                  <p className="text-sm text-muted-foreground">Fill in coin information with smart suggestions</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Save & Organize</h4>
                  <p className="text-sm text-muted-foreground">Automatically categorized and ready to view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;