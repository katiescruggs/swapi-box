import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

global.localStorage = {
  result: {},
  setItem: (key, value) => {
    localStorage.result[key] = value;
  },
  getItem: (key) => {
    return localStorage.result[key];
  }
};

describe('App', () => {
  it('should render correctly', () => {
    const renderedApp = shallow(<App />);

    expect(renderedApp.find('.App').length).toEqual(1);
  });  
});