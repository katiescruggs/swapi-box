import React from 'react';
import './NoData.css';

const NoData = ({category, dataLength}) => {
  let message = category ? `No favorites to display yet!` : 'Please select a category.';

  if(!dataLength) {
    message = 'Loading data... Please wait.'
  }

  return (
    <div className="no-data">
      {message}
    </div>
  )
}

export default NoData;