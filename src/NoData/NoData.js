import React from 'react';
import './NoData.css';

const NoData = ({category, dataLength}) => {
  let message = category 
    ? `No favorites to display!` 
    : 'Please select a category.';

  if(!dataLength) {
    message = 'Loading data... Please wait.'
  }

  return (
    <div className="card-container no-data">
      <h2>{message}</h2>
    </div>
  );
}

export default NoData;