import React from 'react';
import './PokemonDetails.css';
import { NOT_FOUND } from '../../helpers/AppConstants';

const PokemonDetails = ({ data, closeDetails }) => {
  const {
    details: { sprites, id, abilities, height, types },
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
            <h4>Height: {height}</h4>
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
}


export default PokemonDetails;