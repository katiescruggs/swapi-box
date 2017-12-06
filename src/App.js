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

  async getVehicles() {
    const fetchVehicles = await fetch('https://swapi.co/api/vehicles');
    const vehiclesData = await fetchVehicles.json();
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
        }

      }
    });
  }

  async getPlanets() {
    const fetchPlanets = await fetch('https://swapi.co/api/planets');
    const planetsData = await fetchPlanets.json();
    return this.formatPlanets(planetsData.results);
  }

  formatPlanets(planetsArray) {
    const unresolvedPromises = planetsArray.map(async (planet) => {
      const {name, terrain, population, climate, residents} = planet;
        const unresolvedResidents = residents.map(async (resident) => {
          const residentFetch = await fetch(resident);
          const residentData = await residentFetch.json();
          console.log(residentData.name);
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
          }
        }
    });
    return Promise.all(unresolvedPromises);
  }

  async getPeople() {
    const fetchPeople = await fetch('https://swapi.co/api/people');
    const peopleData = await fetchPeople.json();
    return this.formatPeople(peopleData.results);
  }

  formatPeople(peopleArray) {
    const unresolvedPromises = peopleArray.map(async (person) => {
      const {name, homeworld, species} = person;
      let homeworldFetch = await fetch(person.homeworld);
      let homeworldData = await homeworldFetch.json();

      let speciesFetch = await fetch(person.species);
      let speciesData = await speciesFetch.json();

      return {
        name: person.name, 
        stats: {
          homeworld: homeworldData.name,
          species: speciesData.name,
          population: homeworldData.population,
          language: speciesData.language 
        }
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
        {this.state.people.length > 0 &&
          <CardContainer category={category} data={this.state[category]} addFav={this.addFav} removeFav={this.removeFav} />
        }
      </div>
    );
  }
}

export default App;
