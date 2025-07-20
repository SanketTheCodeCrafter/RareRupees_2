import React from 'react';
import Icon from '../../../components/AppIcon';

const TagsSection = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const getTagColor = (tag) => {
    const colors = {
      'Independence Era': 'bg-primary/10 text-primary border-primary/20',
      'Silver': 'bg-secondary/10 text-secondary border-secondary/20',
      'British India': 'bg-accent/10 text-accent border-accent/20',
      'Rare': 'bg-warning/10 text-warning border-warning/20',
      'Gold': 'bg-warning/10 text-warning border-warning/20',
      'Copper': 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return colors[tag] || 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className="mx-6 mb-4 morphic-card">
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Tag" size={16} className="text-primary" />
          </div>
          <h3 className="font-semibold text-card-foreground">Tags</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(tag)} spring-smooth`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsSection;