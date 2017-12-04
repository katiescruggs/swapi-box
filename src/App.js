import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';

import PersonData from './data/person-data.js';
import PlanetData from './data/planet-data.js';
import VehicleData from './data/vehicle-data.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Choose a Category',
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    }
  }

  componentDidMount() {
    this.setState({people: PersonData, planets: PlanetData, vehicles: VehicleData});
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
    return (
      <div className="App">
        <Header chooseCategory={this.chooseCategory}/>
        <Controls chooseCategory={this.chooseCategory}/>
        <CardContainer category={this.state.category} addFav={this.addFav} removeFav={this.removeFav} />
      </div>
    );
  }
}

export default App;
