import React from 'react';
import Card from './Card.js';
import {shallow} from 'enzyme';

const mockToggleFav = jest.fn();
const mockStats = {homeworld: 'Tattooine', species: 'Human'};
const mockStatsTwo = {
  homeworld: 'Tattooine', 
  species: 'Human',
  language: 'Galactic Basic',
  population: 200000000
}

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
//ADD SNAPSHOTSSSSSSS
  });

  it('has classes of fav and category', () => {
    expect(renderedCard.hasClass('fav')).toEqual(true);
    expect(renderedCard.hasClass('people')).toEqual(true); 
  });

  it('renders a number of li\s based on stats', () => {
    expect(renderedCard.find('li').length).toEqual(2);
    
    const renderedCard2 = shallow(
      <Card
        fav={true}
        cardCat='people'
        toggleFav={mockToggleFav}
        name='Leia Organa'
        stats={mockStatsTwo} />
    );

    expect(renderedCard2.find('li').length).toEqual(4);
  });
});