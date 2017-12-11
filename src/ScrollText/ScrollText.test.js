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

  it('should match snapshot', () => {
    //ADD SNAPSHOTSSSSS
  });

  it('should map over paragraphs and render them', () => {
    expect(renderedScrollText.find('.scroll-p').length).toEqual(4);
  });
});