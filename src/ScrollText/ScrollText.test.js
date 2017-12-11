import React from 'react';
import ScrollText from './ScrollText.js';
import {shallow} from 'enzyme';

const mockFilm = {
  episode: 'VII',
  title: 'Attack of the Clones',
  crawl: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'],
  date: 'May 25, 2000'
};

let renderedScrollText;

describe('ScrollText', () => {
  beforeEach(() => {
    renderedScrollText = shallow(<ScrollText film={mockFilm} />);
  });

  it('should render correctly', () => {
    expect(renderedScrollText).toBeDefined();
  });

  it('render 3 divs, h4, and h3', () => {
    expect(renderedScrollText.find('div').length).toEqual(3);
    expect(renderedScrollText.find('.scrolltext-big-container').length)
      .toEqual(1);
    expect(renderedScrollText.find('.fade').length).toEqual(1);
    expect(renderedScrollText.find('.scrolltext-small-container').length)
      .toEqual(1);
    expect(renderedScrollText.find('h3').length).toEqual(1);
    expect(renderedScrollText.find('h4').length).toEqual(1);
  });

  it('should map over paragraphs and render them', () => {
    expect(renderedScrollText.find('.scroll-p').length).toEqual(4);
  });
});