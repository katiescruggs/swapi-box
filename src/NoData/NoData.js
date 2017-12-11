import React from 'react';
import PropTypes from 'prop-types';

const NoData = ({error, category, dataLength}) => {
  let message = category 
    ? `No favorites to display.` 
    : 'Please select a category.';

  if (error) {
    message = 'Error loading data. Please refresh the page.';
  }

  if (!dataLength) {
    message = 'Loading data... Please wait.';
  }

  return (
    <div className="card-container no-data">
      <h2>{message}</h2>
    </div>
  );
};

export default NoData;

NoData.propTypes = {
  error: PropTypes.bool,
  category: PropTypes.string,
  dataLength: PropTypes.number
};