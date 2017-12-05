import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';
import ScrollText from './ScrollText/ScrollText.js';

import PersonData from './data/person-data.js';
import PlanetData from './data/planet-data.js';
import VehicleData from './data/vehicle-data.js';

const people = [ {name: 'Luke Skywalker', stats: {Homeworld: 'Tatooine', Species: 'Human', Language: 'Galactic Basic', Population: 200000}, fav: false },
                 {name: 'C-3PO', stats: {Homeworld: 'Tatooine', Species: 'Droid', Language: 'n/a', Population: 200000}, fav: false },
                 {name: 'R2-D2', stats: {Homeworld: 'Naboo', Species: 'Droid', Language: 'n/a', Population: 45000000}, fav: false }
               ];

const planets = [ {name: 'Alderaan', stats: {Terrain: 'grasslands, mountains', Population: 20000000, Climate: 'temperate', Residents: ['in', 'an', 'array']}, fav: false},
                  {name: 'Hoth', stats: {Terrain: 'tundra, ice caves, mountain ranges', Population: 'unknown', Climate: 'frozen', Residents: ['in', 'an', 'array']}, fav: false},
                  {name: 'Dagobah', stats: {Terrain: 'swamp, jungles', Population: 'unknown', Climate: 'murky', Residents: ['in', 'an', 'array']}, fav: false}
                ];

const vehicles = [ {name: 'Sand Crawler', stats: {Model: 'Digger Crawler', Class: 'wheeled', 'Number of Passengers': 30}, fav: false},
                   {name: 'T-16 Skyhopper', stats: {Model: 'T-16 Skyhopper', Class: 'repulsorcraft', 'Number of Passengers': 1}, fav: false},
                   {name: 'TIE Bomber', stats: {Model: 'TIE/sa bomber', Class: 'space/planetary bomber', 'Number of Passengers': 0}, fav: false}
                 ];


class App extends Component {
  constructor() {
    super();
    this.state = {
      film: {},
      category: null,
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    }
  }

  async componentDidMount() {
    const film = await this.getFilm();
    //const people =
    //const planets = 
    //const vehicles =

    this.setState({film, people, planets, vehicles});
  }

  async getFilm() {
    const { digit, numeral } = this.getRandomFilmNumber();
    const fetchFilm = await fetch(`https://swapi.co/api/films/${digit}`);
    const filmData = await fetchFilm.json();
    return this.formatFilm(filmData, numeral);
  }

  getRandomFilmNumber(){
    const digitToNumeral = {
      1: 'I',
      2: 'II', 
      3: 'III', 
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII'
    };

    const digit = Math.floor(Math.random() * 6) + 1;
    const numeral = digitToNumeral[digit];

    return {digit, numeral};
  }

  formatFilm(filmData, numeral){
    const regEx = new RegExp(/\s{3,}/, 'g');
    let crawl = filmData.opening_crawl.replace(regEx, '###');
    crawl = crawl.split('###');

    return {
      episode: `Episode ${numeral}`,
      title: filmData.title.toUpperCase(), 
      crawl
    };
  }

  chooseCategory = (e) => {
    this.setState({category: e.target.innerText});
  }

  addFav = (name, category) => {
    const favCard = this.state[category].find(obj => obj.name === name);
    favCard.fav = true;

    const newFavorites = [...this.state.favorites, favCard];
    this.setState({favorites: newFavorites});
  }

  removeFav = (name, category) => {
    const favCard = this.state[category].find(obj => obj.name === name);
    favCard.fav = false;

    const newFavorites = this.state.favorites.filter(fav => fav.name !== name);
    this.setState({favorites: newFavorites});
  }

  render() {
    const {category, film} = this.state;
    return (
      <div className="App">
        <header className="app-header">
          <Header chooseCategory={this.chooseCategory}/>
          <Controls chooseCategory={this.chooseCategory} favorites={this.state.favorites}/>
        </header>
        {this.state.film.crawl && 
          <ScrollText film={film}/>
        }
        <CardContainer category={category} data={this.state[category]} addFav={this.addFav} removeFav={this.removeFav} />
      </div>
    );
  }
}

export default App;
