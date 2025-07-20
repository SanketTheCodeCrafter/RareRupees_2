import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Coin Collector, 15 years",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "RareRupees has completely transformed how I manage my collection. The mobile interface is intuitive, and I can catalog coins anywhere. The image quality is excellent for documentation.",
      rating: 5,
      location: "Mumbai, India"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Numismatist & Researcher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "As a professional numismatist, I need precise documentation. This app's detailed metadata tracking and search capabilities have made my research work significantly more efficient.",
      rating: 5,
      location: "Delhi, India"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Heritage Coin Enthusiast",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "I love how easy it is to track the value of my collection. The filtering system helps me find specific coins instantly. Perfect for serious collectors who want organization.",
      rating: 5,
      location: "Ahmedabad, India"
    }
  ];

  const stats = [
    {
      id: 1,
      number: "10,000+",
      label: "Active Collectors",
      icon: "Users"
    },
    {
      id: 2,
      number: "2.5M+",
      label: "Coins Cataloged",
      icon: "Coins"
    },
    {
      id: 3,
      number: "₹50Cr+",
      label: "Collection Value",
      icon: "TrendingUp"
    },
    {
      id: 4,
      number: "4.9/5",
      label: "User Rating",
      icon: "Star"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground/30"}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Heart" size={16} />
            <span>Loved by Collectors</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Trusted by Thousands of
            <span className="text-primary block">Coin Collectors</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join a community of passionate collectors who have transformed their 
            collection management with RareRupees.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center space-y-3 p-6 morphic-card spring-smooth hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="morphic-card p-6 space-y-4 spring-smooth hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Icon name="Users" size={14} />
                  <span>Growing Community</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Join India's Largest
                  <span className="text-primary block">Digital Coin Community</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Connect with fellow collectors, share discoveries, and learn from experts. 
                  Our community is here to help you grow your collection and knowledge.
                </p>
              </div>

              {/* Community Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={20} className="text-accent" />
                  <span className="text-foreground">Expert advice and discussions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Share2" size={20} className="text-success" />
                  <span className="text-foreground">Share rare finds and discoveries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="BookOpen" size={20} className="text-warning" />
                  <span className="text-foreground">Learn from numismatic experts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Trophy" size={20} className="text-primary" />
                  <span className="text-foreground">Participate in collection contests</span>
                </div>
              </div>
            </div>

            {/* Right - Community Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 text-center space-y-2 shadow-sm">
                <Icon name="Users" size={24} className="text-primary mx-auto" />
                <p className="text-xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center space-y-2 shadow-sm">
                <Icon name="MessageSquare" size={24} className="text-accent mx-auto" />
                <p className="text-xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center space-y-2 shadow-sm">
                <Icon name="Image" size={24} className="text-success mx-auto" />
                <p className="text-xl font-bold text-foreground">2.5M+</p>
                <p className="text-sm text-muted-foreground">Coin Images</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center space-y-2 shadow-sm">
                <Icon name="Award" size={24} className="text-warning mx-auto" />
                <p className="text-xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Expert Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;