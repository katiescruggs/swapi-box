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
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    };
  }

  async componentDidMount() {
    const film = await getFilm();
    await this.setState({film});

    const people = await getPeople();
    const planets = await getPlanets();
    const vehicles = await getVehicles();
    await this.setState({people, planets, vehicles});
  }

  chooseCategory = async (event) => {
    this.setState({category: event.target.innerText});
  }

  toggleFav = (name, category) => {
    const favCard = this.state[category].find(item => item.name === name);
    favCard.fav = !favCard.fav;

    const newFavorites = favCard.fav ? 
      [...this.state.favorites, favCard] 
      : this.state.favorites.filter(fav => fav.name !== name);
    this.setState({favorites: newFavorites});
  }

  render() {
    const {category, film} = this.state;
    return (
      <div className="App">
        <header className="app-header">
          <Header />
          <Controls 
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
