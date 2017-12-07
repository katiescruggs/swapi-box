import React from 'react';
import App from './App';
import {shallow} from 'enzyme';


describe('App', () => {
  it.skip('should render correctly', () => {
    const renderedApp = shallow(<App />);

    expect(renderedApp.find('.App').length).toEqual(1);
  });  
});