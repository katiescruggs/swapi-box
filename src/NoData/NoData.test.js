import React from 'react';
import NoData from './NoData.js';
import {shallow} from 'enzyme';

describe('NoData', () => {
  it('should exist', () => {
    const renderedNoData = shallow(<NoData />);
    expect(renderedNoData).toBeDefined();
  });

  it('should render a div and h2', () => {
    const renderedNoData = shallow(<NoData />);
    expect(renderedNoData.find('.no-data').length).toEqual(1);
    expect(renderedNoData.find('h2').length).toEqual(1);
  });

  it('should display a message if there is an error', () => {
    const renderedNoData = shallow(
      <NoData 
        error={true}
        category={null}
        dataLength={1}
      />);

    expect(renderedNoData.find('h2').text())
      .toEqual('Error loading data. Please refresh the page.');
  });

  it('should diplay a message if there is no data', () => {
    const renderedNoData = shallow(
      <NoData 
        error={false}
        category={null}
        dataLength={0}
      />);

    expect(renderedNoData.find('h2').text())
      .toEqual('Loading data... Please wait.');
  });

  it('should display a message if the category is null', () => {
    const renderedNoData = shallow(
      <NoData 
        error={false}
        category={null}
        dataLength={1}
      />);

    expect(renderedNoData.find('h2').text())
      .toEqual('Please select a category.');
  });

  it('should display a message if there are no favorites', () => {
    const renderedNoData = shallow(
      <NoData 
        error={false}
        category={'favorites'}
        dataLength={1}
      />);

    expect(renderedNoData.find('h2').text())
      .toEqual('No favorites to display.');
  });
});