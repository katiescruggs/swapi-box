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
    this.setState({film});
  }

  chooseCategory = async (event) => {
    const getData = {
      people: getPeople,
      planets: getPlanets,
      vehicles: getVehicles,
      favorites: () => this.state.favorites
    }

    const category = event.target.innerText;
    let dataArray = this.state[category].length ? this.state[category] : await getData[category]();

    this.setState({category, [category]: dataArray});
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
          <NoData category={category}/>
        }
      </div>
    );
  }
}

export default App;
