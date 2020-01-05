import React from 'react';
import PropTypes from 'prop-types';
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
};

PokemonList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    details: PropTypes.shape({
      sprites: PropTypes.shape({
        front_default: PropTypes.string,
      }),
      id: PropTypes.number,
      abilities: PropTypes.arrayOf(PropTypes.any),
      height: PropTypes.number,
      types: PropTypes.arrayOf(PropTypes.any),
    }),
    name: PropTypes.string,
  })).isRequired,
  showDetails: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  next: PropTypes.string,
};

PokemonList.defaultProps = {
  next: null,
};


export default PokemonList;