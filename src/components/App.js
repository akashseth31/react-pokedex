import React, { Component } from 'react';
import PokemonList from './PokemonList/PokemonList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <PokemonList />
      </div>
    );
  }
}


export default App;
