import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotesSection = ({ coinData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!coinData.notes) {
    return null;
  }

  const truncatedNotes = coinData.notes.length > 100 
    ? coinData.notes.substring(0, 100) + '...'
    : coinData.notes;

  return (
    <div className="mx-6 mb-4 morphic-card">
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={16} className="text-accent" />
          </div>
          <h3 className="font-semibold text-card-foreground">Personal Notes</h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isExpanded ? coinData.notes : truncatedNotes}
          </p>

          {coinData.notes.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-accent hover:text-accent/80 spring-smooth flex items-center space-x-1"
            >
              <span>{isExpanded ? 'Show less' : 'Read more'}</span>
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={14} 
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;