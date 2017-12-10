import {
  getFilm,
  getPeople,
  getPlanets,
  getVehicles
} from './apiCalls.js';



describe('getFilm', () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(
        mockFilmResults
      )
    }))

    const mockFilmResults = {
              title: 'I am a title',
              release_date: '2017-05-30',
              opening_crawl: 'I am a crawl'
            }
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
    }))

    const mockPeopleResults = [
        {
          name: 'Luke Skywalker',
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
    ]
    console.log(peopleData)
  })

});

describe('getPlanets', () => {
  it('should be a function', () => {
    expect(getPlanets).toBeAFunction;
  });
});

describe('getVehicles', () => {
  it('should be a function', () => {
    expect(getVehicles).toBeAFunction;
  });
});