import React from 'react';

import './Card.css';

type Props = {
  title: string;
  value: string;
  styles: {
    gridRow: string;
    gridColumn: string;
  };
};

const Card = ({ title, value, styles }: Props): JSX.Element => {
  return (
    <div className="card" style={styles}>
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default Card;
