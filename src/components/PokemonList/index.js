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
          isFetching && <div className="list-footer">Fetching more data...</div>
        }
        {
          !next && <div className="list-footer">That's end of the list!</div>
        }
    </section>
  )
}


export default PokemonList;