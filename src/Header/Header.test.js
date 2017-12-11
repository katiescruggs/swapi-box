import React from 'react';
import Header from './Header.js';
import {shallow} from 'enzyme';

describe('Header', () => {
  it('should render a header', () => {
    const renderedHeader = shallow(<Header />);
    expect(renderedHeader.find('header').length).toEqual(1);
  });

  it('should have a class of main-header', () => {
    const renderedHeader = shallow(<Header />);
    expect(renderedHeader.hasClass('main-header')).toEqual(true);
  });
});