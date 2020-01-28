import React from 'react';
import Card from './common/Card';
import '../assets/statics/components/CardGrid.css'
const CardGrid = () => {

  return (
    <div className="CardGrid__wrapper">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardGrid;