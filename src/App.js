import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header.js';
import Controls from './Controls/Controls.js';
import CardContainer from './CardContainer/CardContainer.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Controls />
        <CardContainer />
      </div>
    );
  }
}

export default App;
