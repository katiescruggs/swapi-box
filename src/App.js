import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';
import ScrollText from './ScrollText/ScrollText.js';

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
    const people = await this.getPeople();
    const planets = await this.getPlanets();
    const vehicles = await this.getVehicles();

    this.setState({film, people, planets, vehicles});
  }

  async fetchAndJson(apiUrl) {
    const initialFetch = await fetch(apiUrl);
    return initialFetch.json();
  }

  async getVehicles() {
    const vehiclesData = await this.fetchAndJson('https://swapi.co/api/vehicles');
    return this.formatVehicles(vehiclesData.results);
  }

  formatVehicles(vehiclesArray) {
    return vehiclesArray.map(vehicle => {
      const { name, model, vehicle_class, passengers } = vehicle;
      return {
        name,
        stats: {
          model,
          class: vehicle_class,
          passengers
        },
        fav: false,
        cardCat: 'vehicles'
      }
    });
  }

  async getPlanets() {
    const planetsData = await this.fetchAndJson('https://swapi.co/api/planets');
    return this.formatPlanets(planetsData.results);
  }

  formatPlanets(planetsArray) {
    const unresolvedPromises = planetsArray.map(async (planet) => {
      const {name, terrain, population, climate, residents} = planet;
        //separate 2nd map into its own function
        const unresolvedResidents = residents.map(async (resident) => {
          const residentData = await this.fetchAndJson(resident);
          return residentData.name;
        });
        const residentPromises = await Promise.all(unresolvedResidents);

        return {
          name, 
          stats: {
            terrain, 
            population, 
            climate, 
            residents: residentPromises.join(', ') || 'none'
          },
          fav: false,
          cardCat: 'planets'
        }
    });
    return Promise.all(unresolvedPromises);
  }

  async getPeople() {
    const peopleData = await this.fetchAndJson('https://swapi.co/api/people');
    return this.formatPeople(peopleData.results);
  }

  formatPeople(peopleArray) {
    const unresolvedPromises = peopleArray.map(async (person) => {
      const {name, homeworld, species} = person;

      let homeworldData = await this.fetchAndJson(person.homeworld);
      let speciesData = await this.fetchAndJson(person.species);

      return {
        name: person.name, 
        stats: {
          homeworld: homeworldData.name,
          species: speciesData.name,
          population: homeworldData.population,
          language: speciesData.language 
        },
        fav: false,
        cardCat: 'people'
      }
    });

    return Promise.all(unresolvedPromises);
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
    crawl = filmData.opening_crawl.split('   ');

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
          <Controls 
            chooseCategory={this.chooseCategory} 
            favorites={this.state.favorites}
          />
        </header>
        {this.state.film.crawl && 
          <ScrollText film={film}/>
        }
        {this.state.people.length > 0 &&
          <CardContainer 
            category={category} 
            data={this.state[category]} 
            addFav={this.addFav} 
            removeFav={this.removeFav} 
          />
        }
      </div>
    );
  }
}

export default App;
