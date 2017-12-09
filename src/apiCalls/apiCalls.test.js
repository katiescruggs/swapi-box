import {
  getFilm,
  getPeople,
  getPlanets,
  getVehicles
} from './apiCalls.js';

describe('getFilm', () => {
  it('should be a function', () => {
    expect(getFilm).toBeAFunction;
  });


});

describe('getPeople', () => {
  it('should be a function', () => {
    expect(getPeople).toBeAFunction;
  });
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