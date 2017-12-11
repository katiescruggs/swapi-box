/* eslint-disable camelcase */

import {
  fetchAndJson,
  getFilm,
  getPeople,
  getPlanets,
  getVehicles,
  fetchPlanetResidents
} from './apiCalls.js';

describe('fetchAndJson', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        {
          genericData: 'I am data!'
        }
      )
    }));
  });

  it('should be a function', () => {
    expect(fetchAndJson).toBeAFunction;
  });

  it('should return generic data', async () => {
    const genericData = await fetchAndJson('example call');
    expect(genericData).toBeAnObject;
    
    expect(genericData).toEqual({genericData: 'I am data!'});
  });
});

describe('getFilm', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        mockFilmResults
      )
    }));

    const mockFilmResults = 
      {
        title: 'I am a title',

        release_date: '2017-05-30',
        opening_crawl: 'I am a crawl'
      };
  });

  it('should be a function', () => {
    expect(getFilm).toBeAFunction;
  });

  it('should return an object of results', async () => {
    const filmData = await getFilm();
    expect(typeof filmData).toEqual('object');
  });

  it('should return title, release date, and crawl', async () => {
    const mockFormattedFilm = 
      {
        title: 'I AM A TITLE',
        date: 'May 30, 2017',
        crawl: ['I am a crawl']
      };    

    const filmData = await getFilm();
    expect(filmData.title).toEqual(mockFormattedFilm.title);
    expect(filmData.date).toEqual(mockFormattedFilm.date);
    expect(filmData.crawl).toEqual(mockFormattedFilm.crawl);
  });
});

describe('getPeople', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        {
          results: mockPeopleResults
        }
      )
    }));

    const mockPeopleResults = [
      {
        name: 'Luke Skywalker'
      },
      {
        name: 'Leia Organa'
      }
    ];
  });

  it('should be a function', () => {
    expect(getPeople).toBeAFunction;
  });

  it('should return an object', async () => {
    const peopleData = await getPeople();
    expect(typeof peopleData).toEqual('object');
  });

  it('should return expected information', async () => {
    const peopleData = await getPeople();

    const mockFormattedPeople = [
      {
        name: 'Luke Skywalker',
        stats: {
          homeworld: undefined,
          species: undefined,
          population: undefined,
          language: undefined
        },
        fav: false,
        cardCat: 'people'
      },
      {
        name: 'Leia Organa', 
        stats: {
          homeworld: undefined,
          species: undefined,
          population: undefined,
          language: undefined
        },
        fav: false,
        cardCat: 'people'
      }
    ];

    expect(peopleData).toEqual(mockFormattedPeople);
  });
});

describe('getPlanets', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        {
          results: mockPlanetsResults
        }
      )
    }));

    const mockPlanetsResults = [
      {
        name: 'Tattooine',
        terrain: 'terrain-tat',
        population: 'population-tat',
        climate: 'climate-tat',
        residents: []
      },
      {
        name: 'Hoth',
        terrain: 'terrain-hoth',
        population: 'population-hoth',
        climate: 'cold',
        residents: []
      }
    ];
  });

  it('should be a function', () => {
    expect(getPlanets).toBeAFunction;
  });

  it('should return an object', async () => {
    const planetsData = await getPlanets();
    expect(typeof planetsData).toEqual('object');
  });

  it('should return the expected information', async () => {
    const planetsData = await getPlanets();
    const mockFormattedPlanets = [
      {
        name: 'Tattooine',
        stats: {
          terrain: 'terrain-tat',
          population: 'population-tat',
          climate: 'climate-tat',
          residents: 'none'
        },
        fav: false,
        cardCat: 'planets'
      },
      {
        name: 'Hoth', 
        stats: {
          terrain: 'terrain-hoth',
          population: 'population-hoth',
          climate: 'cold',
          residents: 'none'
        },
        fav: false,
        cardCat: 'planets'
      }
    ];

    expect(planetsData).toEqual(mockFormattedPlanets);
  });
});

describe('getVehicles', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        {
          results: mockVehiclesResults
        }
      )
    }));

    const mockVehiclesResults = [
      {
        name: 'vehicle1',
        model: 'model1',
        passengers: 'passengers1',
        vehicle_class: 'class1'
      },
      {
        name: 'vehicle2',
        model: 'model2',
        passengers: 'passengers2',
        vehicle_class: 'class2'
      }
    ];
  });

  it('should be a function', () => {
    expect(getVehicles).toBeAFunction;
  });

  it('should return an object', async () => {
    const vehiclesData = await getVehicles();
    expect(typeof vehiclesData).toEqual('object');
  });

  it('should return the expected information', async () => {
    const vehiclesData = await getVehicles();
    const mockFormattedVehicles = [
      {
        cardCat: 'vehicles',
        fav: false,
        name: 'vehicle1',
        stats: {
          class: 'class1',
          model: 'model1',
          passengers: 'passengers1'
        }
      },
      {
        cardCat: 'vehicles',
        fav: false,
        name: 'vehicle2',
        stats: {
          class: 'class2',
          model: 'model2',
          passengers: 'passengers2'
        }
      }
    ];

    expect(vehiclesData).toEqual(mockFormattedVehicles);
  });
});

describe('fetchPlanetResidents', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        {
          name: 'I am a resident name'
        }
      )
    }));
  });

  it('should be a function', () => {
    expect(fetchPlanetResidents).toBeAFunction;
  });

  it('should return an array of residents', async () => {
    const mockParameters = ['https://swapi.co/people/1'];
    const residents = await fetchPlanetResidents(mockParameters);

    expect(residents).toBeAnArray;
    expect(residents.length).toEqual(mockParameters.length);
  });

  it('should return names of residents', async() => {
    const mockParameters = ['https://swapi.co/people/1'];
    const residents = await fetchPlanetResidents(mockParameters);

    expect(residents).toEqual(['I am a resident name']);
  });
});
