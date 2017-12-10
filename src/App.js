import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';
import ScrollText from './ScrollText/ScrollText.js';
import NoData from './NoData/NoData.js';

import {
  getFilm, 
  getPeople, 
  getPlanets, 
  getVehicles 
} from './apiCalls/apiCalls.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      film: {},
      category: null,
      errorStatus: false,
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    };
  }

  async componentDidMount() {
    await this.getInitialFilmData();
    await this.getInitialCardData();
    this.updateLocalStorage();
  }

  getInitialFilmData = async () => {
    try {
      const film = await getFilm();
      this.setState({film});
    } catch(error) {
      this.setState({errorStatus: true});
    }
  }

  getInitialCardData = async () => {
    try {
      const people = JSON.parse(localStorage.getItem('people')) || await getPeople();
      const planets = JSON.parse(localStorage.getItem('planets')) || await getPlanets();
      const vehicles = JSON.parse(localStorage.getItem('vehicles')) || await getVehicles();
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
   
      this.setState({people, planets, vehicles, favorites});
    } catch(error) {
      this.setState({errorStatus: true});
    }
  }

  updateLocalStorage() {
    localStorage.setItem('people', JSON.stringify(this.state.people));
    localStorage.setItem('planets', JSON.stringify(this.state.planets));
    localStorage.setItem('vehicles', JSON.stringify(this.state.vehicles));
    localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
  }

  chooseCategory = async (event) => {
    await this.setState({category: event.target.innerText});
  }

  toggleFav = async (name, category) => {
    const favCard = this.state[category].find(item => item.name === name);
    favCard.fav = !favCard.fav;

    const newFavorites = favCard.fav ? 
      [...this.state.favorites, favCard] 
      : this.state.favorites.filter(fav => fav.name !== name);
    await this.setState({favorites: newFavorites});
    this.updateLocalStorage();
  }

  render() {
    const {category, film} = this.state;
    return (
      <div className="App">
        <header className="app-header">
          <Header />
          <Controls
            category={category} 
            chooseCategory={this.chooseCategory} 
            favorites={this.state.favorites}
          />
        </header>
        {this.state.film.crawl && 
          <ScrollText film={film}/>
        }
        {(category && this.state[category].length > 0) &&
          <CardContainer 
            category={category} 
            cardData={this.state[category]} 
            toggleFav={this.toggleFav} 
          />
        } 
        {(!category || this.state[category].length === 0) &&
          <NoData category={category} dataLength={this.state.people.length}/>
        }
      </div>
    );
  }
}

export default App;
