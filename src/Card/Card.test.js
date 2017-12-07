import React from 'react';
import Card from './Card.js';
import {shallow} from 'enzyme';

const mockToggleFav = jest.fn();
const mockStats = {homeworld: 'Tattooine', species: 'Human'};

describe('Card', () => {
  it('should render corrrectly', () => {
    const renderedCard = shallow(
      <Card 
        fav={true}
        cardCat='people'
        toggleFav={mockToggleFav}
        name='Luke Skywalker'
        stats={mockStats}
      />);
    expect(renderedCard).toBeDefined();
  });
});