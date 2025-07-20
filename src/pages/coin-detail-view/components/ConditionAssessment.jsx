import React from 'react';
import Icon from '../../../components/AppIcon';

const ConditionAssessment = ({ coinData }) => {
  const getConditionScore = (condition) => {
    const scores = {
      'Poor': 20,
      'Fair': 35,
      'Good': 50,
      'Very Good': 65,
      'Fine': 75,
      'Very Fine': 85,
      'Extremely Fine': 92,
      'About Uncirculated': 96,
      'Uncirculated': 100
    };
    return scores[condition] || 50;
  };

  const getConditionColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    if (score >= 50) return 'text-accent';
    return 'text-destructive';
  };

  const conditionScore = getConditionScore(coinData.condition);
  const conditionColor = getConditionColor(conditionScore);

  return (
    <div className="mx-6 mb-4 morphic-card">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Award" size={16} className="text-primary" />
          </div>
          <h3 className="font-semibold text-card-foreground">Condition Assessment</h3>
        </div>

        {/* Condition Grade */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Grade</span>
            <span className={`font-bold text-lg ${conditionColor}`}>
              {coinData.condition}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Uncirculated</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full spring-smooth ${
                  conditionScore >= 90 ? 'bg-success' :
                  conditionScore >= 75 ? 'bg-warning' :
                  conditionScore >= 50 ? 'bg-accent' : 'bg-destructive'
                }`}
                style={{ width: `${conditionScore}%` }}
              />
            </div>
            <div className="text-center">
              <span className={`text-sm font-medium ${conditionColor}`}>
                {conditionScore}/100
              </span>
            </div>
          </div>

          {/* Grade Details */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Professional Grade</span>
              <span className="font-mono font-semibold text-card-foreground">
                {coinData.grade}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {coinData.condition === 'Very Fine' && 'Shows moderate wear on high points. All major details are clear and bold.'
              }
              {coinData.condition === 'Extremely Fine' && 'Light wear on highest points. All details sharp and clear.'
              }
              {coinData.condition === 'Uncirculated' && 'No trace of wear. Original mint luster present.'
              }
              {!['Very Fine', 'Extremely Fine', 'Uncirculated'].includes(coinData.condition) &&
                'Condition assessment based on professional grading standards.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionAssessment;