import React from 'react';
import PropTypes from 'prop-types';
import './PokemonItems.css';
import { NOT_FOUND } from '../../helpers/AppConstants';


const PokemonItems = ({ data, showDetails }) => {
  const {
    name,
    details: { sprites },
  } = data;
  return (
    <button
      onClick={() => showDetails(name)}
      className="items"
      style={{ backgroundImage: `url(${sprites.front_default || NOT_FOUND})` }}
    >
      <div className="short-detail">
        {name}
      </div>
    </button>
  );
};

PokemonItems.propTypes = {
  data: PropTypes.shape({
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
  }).isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default PokemonItems;