import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SupportSection = ({ userProfile }) => {
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'suggestion',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { value: 'bug', label: 'Bug Report' },
    { value: 'suggestion', label: 'Feature Suggestion' },
    { value: 'question', label: 'Question' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    
    if (!feedbackForm.subject || !feedbackForm.message) return;

    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setSubmitting(false);
    setFeedbackForm({ type: 'suggestion', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleInputChange = (field, value) => {
    setFeedbackForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Help & Documentation */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Help & Documentation</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={20} className="text-blue-500" />
              <div>
                <h4 className="font-medium text-foreground">User Guide</h4>
                <p className="text-sm text-muted-foreground">Learn how to use RareRupees effectively</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Open user guide')}
              iconName="ExternalLink"
            >
              Open
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="HelpCircle" size={20} className="text-green-500" />
              <div>
                <h4 className="font-medium text-foreground">FAQ</h4>
                <p className="text-sm text-muted-foreground">Frequently asked questions and answers</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Open FAQ')}
              iconName="ExternalLink"
            >
              View
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Video" size={20} className="text-purple-500" />
              <div>
                <h4 className="font-medium text-foreground">Video Tutorials</h4>
                <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Open tutorials')}
              iconName="ExternalLink"
            >
              Watch
            </Button>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Send Feedback</h3>
        
        {submitted ? (
          <div className="text-center p-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Thank You!</h4>
            <p className="text-muted-foreground">
              Your feedback has been submitted. We will review it and get back to you if needed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Feedback Type
              </label>
              <Select
                value={feedbackForm.type}
                onValueChange={(value) => handleInputChange('type', value)}
                options={feedbackTypes}
                placeholder="Select feedback type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <Input
                type="text"
                value={feedbackForm.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Brief description of your feedback"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                value={feedbackForm.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Provide detailed information about your feedback..."
                rows={5}
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>

            <Button
              type="submit"
              loading={submitting}
              iconName="Send"
              className="w-full"
              disabled={!feedbackForm.subject || !feedbackForm.message}
            >
              Send Feedback
            </Button>
          </form>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Mail" size={20} className="text-blue-500" />
            <div>
              <h4 className="font-medium text-foreground">Email Support</h4>
              <p className="text-sm text-muted-foreground">support@rarerupees.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="MessageCircle" size={20} className="text-green-500" />
            <div>
              <h4 className="font-medium text-foreground">Community Forum</h4>
              <p className="text-sm text-muted-foreground">Connect with other collectors</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Twitter" size={20} className="text-blue-400" />
            <div>
              <h4 className="font-medium text-foreground">Social Media</h4>
              <p className="text-sm text-muted-foreground">@RareRupeesApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">App Information</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Version</span>
            <span className="text-sm text-muted-foreground">1.0.0</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Build</span>
            <span className="text-sm text-muted-foreground">2024.07.20</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Platform</span>
            <span className="text-sm text-muted-foreground">Web App</span>
          </div>
          
          <hr className="border-border" />
          
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Check for updates')}
              iconName="RefreshCw"
            >
              Check for Updates
            </Button>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
        
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log('Open terms')}
            iconName="FileText"
          >
            Terms of Service
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log('Open privacy')}
            iconName="Shield"
          >
            Privacy Policy
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log('Open licenses')}
            iconName="Award"
          >
            Open Source Licenses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;