import React from 'react';
import './NoData.css';

const NoData = ({category}) => {
  const message = category ? 'No favorites to display yet!' : 'Please select a category.';
  return (
    <div className="no-data">
      {message}
    </div>
  )
}

export default NoData;