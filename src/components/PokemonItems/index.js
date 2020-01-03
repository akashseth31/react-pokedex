import React from 'react';
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


export default PokemonItems;