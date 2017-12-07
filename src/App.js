import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';
import ScrollText from './ScrollText/ScrollText.js';

import { getFilm, getPeople, getPlanets, getVehicles } from './apiCalls/apiCalls.js';

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
    const film = await getFilm();
    const people = await getPeople();
    const planets = await getPlanets();
    const vehicles = await getVehicles();

    this.setState({film, people, planets, vehicles});
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
