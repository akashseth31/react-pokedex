import React from 'react';
import PropTypes from 'prop-types';
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
};

Header.propTypes = {
  toggleFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  appliedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  records: PropTypes.number.isRequired,
};


export default Header;