import React from 'react';

import Card from '../card/Card';
import { computeStatistics, hydrateValues } from './tools';
import { Props } from './types';
import './Statistics.css';
import DynamicCard from '../dynamic-card/DynamicCard';

const Statistics = ({ formData, setShowStatistics }: Props): JSX.Element => {
  return (
    <div className="statistics-container">
      <div className="statistics-grid">
        {hydrateValues(computeStatistics(formData), formData).map(card =>
          card._tag === 'dynamic' ? (
            <DynamicCard key={card.id} {...card} />
          ) : (
            <Card key={card.id} {...card} />
          ),
        )}
      </div>
      <div className="statistics-footer">
        <button
          className="back-button"
          onClick={() => setShowStatistics(false)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Statistics;
