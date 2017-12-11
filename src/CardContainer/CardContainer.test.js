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

  it('should exist', () => {
    expect(renderedCardContainer).toBeDefined();
  });

  it('should have a card-container, h2, $ card-holder', () => {
    expect(renderedCardContainer.find('.card-container').length).toEqual(1);
    expect(renderedCardContainer.find('h2').length).toEqual(1);
    expect(renderedCardContainer.find('.card-holder').length).toEqual(1);
  });

  it('should render all the cards it\'s given', () => {
    expect(renderedCardContainer.find('Card').length).toEqual(2);
  });
});