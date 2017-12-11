import React from 'react';
import './NoData.css';
import PropTypes from 'prop-types';

const NoData = ({error, category, dataLength}) => {
  let message = category 
    ? `No favorites to display!` 
    : 'Please select a category.';

  if (!dataLength) {
    message = 'Loading data... Please wait.';
  }

  if(error) {
    message = 'Error loading data. Please refresh the page.';
  }

  return (
    <div className="card-container no-data">
      <h2>{message}</h2>
    </div>
  );
};

export default NoData;

NoData.propTypes = {
  category: PropTypes.string,
  dataLength: PropTypes.number
};