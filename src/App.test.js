import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

const savedInStorage = {
  film: {
    episode: 'Episode I',
    title: 'A New Hope',
    crawl: ['I am', 'a crawl'],
    date: 'May 25, 1983'
  },
  people: [
    {
      name: 'Luke Skywalker',
      stats: {
        homeworld: 'Tattooine',
        species: 'Human',
        population: 'many people',
        language: 'Galactic Basic'
      },
      fav: false,
      cardCat: 'people'
    },
    {
      name: 'Leia Organa',
      stats: {
        homeworld: 'Tattooine',
        species: 'Human',
        population: 'many people',
        language: 'Galactic Basic'       
      },
      fav: false,
      cardCat: 'people'
    }
  ],
  planets: [
    {
      name: 'Hoth',
      stats: {
        terrain: 'hothy',
        population: 0,
        climate: 'cold',
        residents: 'none'
      },
      fav: false,
      cardCat: 'planets'
    }
  ],
  vehicles: [
    {
      name: 'Sand Crawler',
      stats: {
        model: 'sandy',
        class: 'classy',
        passengers: 0
      },
      fav: false,
      cardCat: 'vehicles'
    }
  ],
  favorites: []
};

global.localStorage = {
  setItem: () => {},
  getItem: (query) => {
    return JSON.stringify(savedInStorage[query]);
  }
};

let renderedApp;

describe('App', () => {
  beforeEach(async () => {
    renderedApp = await mount(<App />);
  });

  it('should exist', () => {
    expect(renderedApp).toBeDefined;
  });

  it('should render its components correctly', () => {
    expect(renderedApp.find('.App').length).toEqual(1);
    expect(renderedApp.find('.app-header').length).toEqual(1);
    expect(renderedApp.find('Header').length).toEqual(1);
    expect(renderedApp.find('Controls').length).toEqual(1);
    expect(renderedApp.find('CardContainer').length).toEqual(0);
    expect(renderedApp.find('NoData').length).toEqual(1);
  });

  it('should have a default state', () => {
    renderedApp = shallow(<App />);

    const defaultState = {
      film: savedInStorage.film,
      category: null,
      errorStatus: false,
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    };
    expect(renderedApp.state()).toEqual(defaultState);
  });

  it('should update state when component mounts', () => {
    const expectedState = 
      Object.assign({}, {category: null, errorStatus: false}, savedInStorage);
    expect(renderedApp.instance().state).toEqual(expectedState);
  });

  it('should change category in state when control button is clicked', () => {
    renderedApp.find('.people-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'people' }; }}});
    expect(renderedApp.state().category).toEqual('people');

    renderedApp.find('.planets-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'planets'}; }}});
    expect(renderedApp.state().category).toEqual('planets');
  });

  it('should add card to favorites in state when card is clicked', () => {
    expect(renderedApp.state().favorites.length).toEqual(0);

    renderedApp.find('.people-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'people'}; }}});
    renderedApp.find('.card').first().simulate('click');

    expect(renderedApp.state().favorites.length).toEqual(1);
  });

  it('should change card class to favorite when a card is clicked', () => {
    renderedApp.find('.people-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'people'}; }}});
    expect(renderedApp.find('.fav').length).toEqual(0);

    renderedApp.find('.card').first().simulate('click');

    expect(renderedApp.find('.fav').length).toEqual(1);

  });

  it('should remove favorite from state when a fav card is clicked', () => {
    renderedApp.find('.people-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'people'}; }}});
    renderedApp.find('.card').first().simulate('click');

    expect(renderedApp.state().favorites.length).toEqual(1);

    renderedApp.find('.card').first().simulate('click');

    expect(renderedApp.state().favorites.length).toEqual(0);
  });

  it('should remove favorite class from card when it is clicked again', () => {
    renderedApp.find('.people-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'people'}; }}});
    renderedApp.find('.card').first().simulate('click');

    expect(renderedApp.find('.fav').length).toEqual(1);
    renderedApp.find('.card').first().simulate('click');
    expect(renderedApp.find('.fav').length).toEqual(0);
  });

  it('should render cards when a category is clicked', () => {
    expect(renderedApp.find('.card').length).toEqual(0);
    
    renderedApp.find('.planets-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'planets'}; }}});
    
    expect(renderedApp.find('.card').length).toBeGreaterThan(0);
  });

  it('should render a no data message only when there are no cards', () => {
    expect(renderedApp.find('.no-data').length).toEqual(1);
    
    renderedApp.find('.planets-button').simulate('click', 
      {target: {closest: () => { return {innerText: 'planets'}; }}});

    expect(renderedApp.find('.no-data').length).toEqual(0);
  });

  it('should change the errorStatus in the state', async () => {
    expect(renderedApp.state().errorStatus).toEqual(false);

    savedInStorage.film = undefined;
    renderedApp = await mount(<App />);

    expect(renderedApp.state().errorStatus).toEqual(true);
  });

  it('should display an error message if errorStatus is true', () => {
    renderedApp.setState({errorStatus: true});

    expect(renderedApp.find('.no-data').text())
      .toEqual('Error loading data. Please refresh the page.');
  });
});