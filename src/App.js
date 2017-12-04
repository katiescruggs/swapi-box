import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';

import PersonData from './data/person-data.js';
import PlanetData from './data/planet-data.js';
import VehicleData from './data/vehicle-data.js';

const people = [ {name: 'Luke Skywalker', stats: {Homeworld: 'Tatooine', Species: 'Human', Language: 'Galactic Basic', Population: 200000} },
                 {name: 'C-3PO', stats: {Homeworld: 'Tatooine', Species: 'Droid', Language: 'n/a', Population: 200000} },
                 {name: 'R2-D2', stats: {Homeworld: 'Naboo', Species: 'Droid', Language: 'n/a', Population: 45000000} }
               ];

const planets = [ {name: 'Alderaan', stats: {Terrain: 'grasslands, mountains', Population: 20000000, Climate: 'temperate', Residents: ['in', 'an', 'array']}},
                  {name: 'Hoth', stats: {Terrain: 'tundra, ice caves, mountain ranges', Population: 'unknown', Climate: 'frozen', Residents: ['in', 'an', 'array']}},
                  {name: 'Dagobah', stats: {Terrain: 'swamp, jungles', Population: 'unknown', Climate: 'murky', Residents: ['in', 'an', 'array']}}
                ];

const vehicles = [ {name: 'Sand Crawler', stats: {Model: 'Digger Crawler', Class: 'wheeled', 'Number of Passengers': 30}},
                   {name: 'T-16 Skyhopper', stats: {Model: 'T-16 Skyhopper', Class: 'repulsorcraft', 'Number of Passengers': 1}},
                   {name: 'TIE Bomber', stats: {Model: 'TIE/sa bomber', Class: 'space/planetary bomber', 'Number of Passengers': 0}}
                 ];


class App extends Component {
  constructor() {
    super();
    this.state = {
      category: 'people',
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    }
  }

  componentDidMount = () => {
    this.setState({people, planets, vehicles});
  }

  chooseCategory = (e) => {
    this.setState({category: e.target.innerText});
  }

  addFav = () => {
    console.log('add fav');
    const favCard = 'new favorite';
    const newFavorites = [...this.state.favorites, favCard];
    this.setState({favorites: newFavorites});
  }

  removeFav = () => {
    console.log('remove fav');
  }

  render() {
    const {category} = this.state;
    return (
      <div className="App">
        <Header chooseCategory={this.chooseCategory}/>
        <Controls chooseCategory={this.chooseCategory}/>
        <CardContainer category={category} data={this.state[category]} addFav={this.addFav} removeFav={this.removeFav} />
      </div>
    );
  }
}

export default App;
