import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

// window.fetch = jest.fn().mockImplementation(() => {
//   Promise.resolve({
//     json: () => Promise.resolve({
//       results: [{1: 'object1'}, {2: 'object2'}]
//     });
//   });
// });

describe('App', () => {
  it('should render correctly', () => {
    const renderedApp = shallow(<App />);

    expect(renderedApp.find('.App').length).toEqual(1);
  });  
});