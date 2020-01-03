import React from 'react';
import './PokemonDetails.css';
import { NOT_FOUND } from '../../helpers/AppConstants';

const PokemonDetails = ({ data, closeDetails }) => {
  const {
    details: { sprites },
  } = data;

  return (
    <div className="overlay">
      <div className="pokemon-details">
        <button onClick={closeDetails} />
        <div className="pokemon-details-inner">
          <aside className="image" style={{ backgroundImage: `url(${sprites.front_default || NOT_FOUND})` }} />
          <aside className="details"></aside>
        </div>
      </div>
    </div>
  )
}


export default PokemonDetails;