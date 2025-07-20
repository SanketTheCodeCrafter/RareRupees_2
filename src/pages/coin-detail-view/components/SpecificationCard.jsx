import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SpecificationCard = ({ coinData }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const specifications = [
    { label: 'Composition', value: coinData.composition, icon: 'Atom' },
    { label: 'Weight', value: coinData.weight, icon: 'Scale' },
    { label: 'Diameter', value: coinData.diameter, icon: 'Circle' },
    { label: 'Edge', value: coinData.edge, icon: 'RotateCcw' },
    { label: 'Mintage', value: coinData.mintage, icon: 'Factory' },
    { label: 'Catalog Number', value: coinData.catalogNumber, icon: 'Hash' }
  ];

  return (
    <div className="mx-6 mb-4 morphic-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between touch-target"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Info" size={16} className="text-accent" />
          </div>
          <h3 className="font-semibold text-card-foreground">Specifications</h3>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground spring-smooth"
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Icon name={spec.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{spec.label}</span>
              </div>
              <span className="text-sm font-medium text-card-foreground font-mono">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificationCard;