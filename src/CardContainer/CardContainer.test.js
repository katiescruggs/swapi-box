import React from 'react';
import CardContainer from './CardContainer.js';
import {shallow} from 'enzyme';

const mockToggleFav = jest.fn();
let mockCardData = [
  {
    fav: true,
    cardCat: 'people',
    toggleFav: mockToggleFav,
    name: 'Luke Skywalker',
    stats: {}
  },
  {
    fav: false,
    cardCat: 'people',
    toggleFav: mockToggleFav,
    name: 'Leia Organa',
    stats: {}
  }
];
const mockCategory = 'people';
let renderedCardContainer;

describe('CardContainer', () => {
  beforeEach(() => {
    renderedCardContainer = shallow(
      <CardContainer
        category={mockCategory}
        cardData={mockCardData}
        toggleFav={mockToggleFav} />
    );
  });

  it('should render correctly', () => {
    expect(renderedCardContainer).toBeDefined();
  });

  it('should render all the cards it\'s given', () => {
    expect(renderedCardContainer.find('Card').length).toEqual(2);
  });

  it('should display a no cards message if there are no cards', () => {
    mockCardData = null;
    renderedCardContainer = shallow(
      <CardContainer
        category={mockCategory}
        cardData={mockCardData}
        toggleFav={mockToggleFav} />
    );
    expect(renderedCardContainer.find('Card').length).toEqual(0);
    expect(renderedCardContainer.find('.no-cards-msg').length).toEqual(1);
  });
});