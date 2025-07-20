import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Mobile App", href: "#mobile" },
      { label: "Desktop", href: "#desktop" }
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Contact Us", href: "#contact" },
      { label: "Community", href: "#community" },
      { label: "Status", href: "#status" }
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "#twitter" },
    { name: "Facebook", icon: "Facebook", href: "#facebook" },
    { name: "Instagram", icon: "Instagram", href: "#instagram" },
    { name: "LinkedIn", icon: "Linkedin", href: "#linkedin" },
    { name: "YouTube", icon: "Youtube", href: "#youtube" }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription');
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Coins" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-card-foreground">RareRupees</h3>
                <p className="text-sm text-muted-foreground">Digital Coin Collection</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              The most trusted platform for coin collectors to digitally catalog, 
              organize, and manage their precious collections with ease.
            </p>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-card-foreground">Follow Us</p>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href)}
                    className="w-9 h-9 bg-muted hover:bg-primary rounded-lg flex items-center justify-center spring-smooth hover:text-white group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon 
                      name={social.icon} 
                      size={18} 
                      className="text-muted-foreground group-hover:text-white" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* App Download Buttons */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-card-foreground">Download App</p>
              <div className="flex flex-col space-y-2">
                <button className="flex items-center space-x-3 bg-muted hover:bg-muted/80 rounded-lg p-3 spring-smooth">
                  <Icon name="Smartphone" size={20} className="text-foreground" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Download for</p>
                    <p className="text-sm font-medium text-foreground">Android & iOS</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-muted-foreground hover:text-foreground spring-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-muted-foreground hover:text-foreground spring-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-muted-foreground hover:text-foreground spring-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-muted-foreground hover:text-foreground spring-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-card-foreground">
                Stay Updated
              </h4>
              <p className="text-muted-foreground">
                Get the latest updates on new features, collecting tips, and community highlights.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="default"
                iconName="Send"
                iconPosition="right"
                className="touch-target"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <p>© {currentYear} RareRupees. All rights reserved.</p>
              <div className="hidden md:flex items-center space-x-4">
                <span>•</span>
                <span>Made with ❤️ for coin collectors</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/authentication-login-register')}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigation('/authentication-login-register')}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Copyright */}
          <div className="md:hidden mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for coin collectors
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;