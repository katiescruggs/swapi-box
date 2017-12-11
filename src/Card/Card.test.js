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
};

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

  it('should render exist', () => {
    expect(renderedCard).toBeDefined();
  });

  it('should render an icon, h3, img, and ul', () => {
    expect(renderedCard.find('.cat-icon').length).toEqual(1);
    expect(renderedCard.find('h3').length).toEqual(1);
    expect(renderedCard.find('img').length).toEqual(1);
    expect(renderedCard.find('ul').length).toEqual(1);
  });

  it('has classes of fav and category', () => {
    expect(renderedCard.hasClass('fav')).toEqual(true);
    expect(renderedCard.hasClass('people')).toEqual(true); 
  });

  it('renders a number of lis based on stats', () => {
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