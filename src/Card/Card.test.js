import React from 'react';
import Card from './Card.js';
import {shallow} from 'enzyme';

const mockToggleFav = jest.fn();
const mockStats = {homeworld: 'Tattooine', species: 'Human'};

let renderedCard;

describe('Card', () => {
  beforeEach(() => {
    renderedCard = shallow(
      <Card 
        fav={true}
        cardCat='people'
        toggleFav={mockToggleFav}
        name='Luke Skywalker'
        stats={mockStats}
      />);
  });

  it('should render corrrectly', () => {
    expect(renderedCard).toBeDefined();
  });

  it('should match the snapshot', () => {

  });

  it('has classes of fav and category', () => {

  });
});