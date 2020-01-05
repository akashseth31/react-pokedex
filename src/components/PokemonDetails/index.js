import React from 'react';
import PropTypes from 'prop-types';
import './PokemonDetails.css';
import { NOT_FOUND } from '../../helpers/AppConstants';

const PokemonDetails = ({ data, closeDetails }) => {
  const {
    details: { sprites, id, abilities, height, weight, types },
    name,
  } = data;

  return (
    <div className="overlay">
      <div className="pokemon-details">
        <button onClick={closeDetails} />
        <div className="pokemon-details-inner">
          <aside className="image" style={{ backgroundImage: `url(${sprites.front_default || NOT_FOUND})` }} />
          <aside className="details">
            <h3>#ID: {id}</h3>
            <h4>NAME: {name}</h4>
            <h4>Height: {height} | Weight: {weight}</h4>
            {abilities.length &&
              <section>
                <h4>Abilities</h4>
                {abilities.map(({ ability }, i) => <span key={ability.name + i}>{ability.name}</span>)}
              </section>
            }
            {types.length &&
              <section>
                <h4>Types</h4>
                {types.map(({ type }, i) => <span key={type.name + i}>{type.name}</span>)}
              </section>
            }
          </aside>
        </div>
      </div>
    </div>
  )
};

PokemonDetails.propTypes = {
  data: PropTypes.shape({
    details: PropTypes.shape({
      sprites: PropTypes.shape({
        front_default: PropTypes.string,
      }),
      id: PropTypes.number,
      abilities: PropTypes.arrayOf(PropTypes.any),
      height: PropTypes.number,
      weight: PropTypes.number,
      types: PropTypes.arrayOf(PropTypes.any),
    }),
    name: PropTypes.string,
  }).isRequired,
  closeDetails: PropTypes.func.isRequired,
};


export default PokemonDetails;