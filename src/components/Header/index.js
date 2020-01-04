import React from 'react';
import { isEmpty } from 'lodash';
import './Header.css';
import Filters from '../Filters';

const Header = ({ filters, toggleFilters, appliedFilters, records }) => {
  return (
    <header>
      <h2>Pokedex</h2>
      {!isEmpty(filters) &&
        <aside className="filters-container">
          <Filters
            filters={filters}
            toggleFilters={toggleFilters}
            appliedFilters={appliedFilters}
            records={records}
          />
        </aside>
      }
    </header>
  )
}


export default Header;