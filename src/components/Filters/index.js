import React, { useState } from 'react';
import './Filters.css';

const FilterItem = ({ name, toggleFilters, selected }) => {
  return (
    <button className={`filter-item ${selected ? 'selected' : ''}`} onClick={() => toggleFilters(name)}>
      {name}
    </button>
  );
}

const Filters = ({ filters, toggleFilters, appliedFilters, records }) => {
  const [isOpen, toggleFilterPanel] = useState(false);
  return (
    <div className="filters">
      <button className="filter-header" onClick={() => toggleFilterPanel(!isOpen)}>
        Filter by {filters.name} (showing {records} records)
      </button>
      {isOpen &&
        <div className="filter-body">
          <div>Click on pills to toggle filters...</div>
          {
            filters.values.map(name =>
              <FilterItem
                name={name}
                toggleFilters={toggleFilters}
                key={name}
                selected={appliedFilters.includes(name)}
              />)
          }
        </div>
      }
    </div>
  )
}


export default Filters;