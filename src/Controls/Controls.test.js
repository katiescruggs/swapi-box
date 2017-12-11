import React from 'react';
import Controls from './Controls.js';
import {shallow} from 'enzyme';

const mockChooseCategory = jest.fn();
const mockFavorites = [1, 2, 3, 4];
let renderedControls;

describe('Controls', () => {
  beforeEach(() => {
    renderedControls = shallow(
      <Controls
        chooseCategory={mockChooseCategory}
        favorites={mockFavorites}
      />);
  });

  it('should exist', () => {
    expect(renderedControls).toBeDefined();
  });

  it('should render 4 buttons in a div', () => {
    expect(renderedControls.find('.control-buttons').length).toEqual(1);
    expect(renderedControls.find('button').length).toEqual(4);
  });

  it('the fav button should have the number of favs', () => {
    const favButton = renderedControls.find('.fav-button');
    expect(favButton.find('span').text()).toEqual('4');
  });

  it('should run the chooseCategory function when a button is clicked', () => {
    expect(mockChooseCategory.mock.calls.length).toEqual(0);

    renderedControls.find('button').first().simulate('click');
    expect(mockChooseCategory.mock.calls.length).toEqual(1);

    renderedControls.find('button').last().simulate('click');
    expect(mockChooseCategory.mock.calls.length).toEqual(2);
  });
});