import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationHeader from './components/NavigationHeader';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Handle hash navigation for smooth scrolling
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section id="features">
          <FeatureSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialSection />
        </section>

        {/* CTA Section */}
        <section id="cta">
          <CTASection />
        </section>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;