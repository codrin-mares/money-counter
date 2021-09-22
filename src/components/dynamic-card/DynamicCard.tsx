import React, { useEffect, useState } from 'react';

import './DynamicCard.css';

type Props = {
  title: string;
  value: string;
  styles: {
    gridRow: string;
    gridColumn: string;
  };
  update: () => string;
};

const DynamicCard = ({ title, value, styles, update }: Props): JSX.Element => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => setCurrentValue(update()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [update]);

  return (
    <div className="dynamic-card" style={styles}>
      <div className="dynamic-card-title">{title}</div>
      <div className="dynamic-card-value">{currentValue}</div>
    </div>
  );
};

export default DynamicCard;
