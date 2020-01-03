import React from 'react';
import './PokemonList.css';
import PokemonItems from '../PokemonItems';

const PokemonList = ({ data, isFetching, next, showDetails }) => {
  return (
    <section className="pokemon-list">
        {
          data.map(pokemonData => <PokemonItems data={pokemonData} key={pokemonData.name} showDetails={showDetails} />)
        }
        {
          isFetching && <div>Fetching More Details...</div>
        }
        {
          !next && <div>That's end of the list!</div>
        }
    </section>
  )
}


export default PokemonList;