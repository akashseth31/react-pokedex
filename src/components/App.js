import React, { Component } from 'react';
import { debounce, flattenDeep, uniq, intersection, isEmpty } from 'lodash';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import Header from './Header';
import './App.css';
import { GET_POKEDEX_DATA, LIMIT } from '../helpers/AppConstants';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      data: [],
      next: null,
      selectedPokemon: null,
      filters: {},
      appliedFilters: [],
    };

    // Binds our scroll event handler for infinite load
    window.onscroll = debounce(() => {
      const {
        getPokedexData,
        state: {
          next
        },
      } = this;

      // Don't load try to load data if next is NULL
      if (!next) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        getPokedexData();
      }
    }, 100);
  }

  componentDidMount() {
    this.getPokedexData();
  }

  /**
   * Loads data from PokeAPI
   */
  getPokedexData = async () => {
    try {
      this.setState({ isFetching: true });
      const { next, data } = this.state;
      const endpoint = next ? next : `${GET_POKEDEX_DATA}?limit=${LIMIT}`;
      const result = await fetch(endpoint);
      const response = await result.json();
      const detailedData = await Promise.all(
        response.results.map(async ({ name, url }) => ({
          name,
          url,
          details: await this.getPokemonDetail(url),
        }))
      );
      const filters = this.extractTypeFilters([...data, ...detailedData]);
      this.setState({
        data: [...data, ...detailedData],
        next: response.next,
        isFetching: false,
        filters,
      });
    } catch (err) {
      console.error(err);
      // To do: Notify error on view
    }
  }

  /**
   * Fetch each pokemon details
   * This is required to show image and filters
   */
  getPokemonDetail = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error('Error occured while fetching pokemon detail', url);
      throw e;
    }
  }

  /**
   * Extract available type filters from the data
   */
  extractTypeFilters = (data) => {
    return {
      name: 'types',
      values: uniq(flattenDeep(data.map(({ details }) => details.types.map(({ type }) => type.name)))),
    };
  }

  /**
   * Gets details of pokemon from data and sets as selected pokemon
   */
  showDetails = (name) => {
    const selectedPokemon = this.state.data.find(d => d.name === name);
    this.setState({ selectedPokemon });
  }

  /**
   * Close pokemon detail overlay
   */
  closeDetails = () => this.setState({ selectedPokemon: null });

  /**
   * Toggle type filters on the data
   */
  toggleFilters = (filter) => {
    const { appliedFilters } = this.state;
    if (appliedFilters.includes(filter)) {
      const appliedFiltersUpdated = [...appliedFilters];
      appliedFiltersUpdated.splice(appliedFilters.indexOf(filter), 1);
      this.setState({ appliedFilters: appliedFiltersUpdated });
    } else {
      this.setState({ appliedFilters: [...appliedFilters, filter] });
    }
  }

  /**
   * Get filtered data
   */
  getFilteredData = () => {
    const { appliedFilters, data } = this.state;
    if (!appliedFilters.length) {
      return data;
    }
    return data.filter(({ details }) =>
      !isEmpty(
        intersection(appliedFilters, details.types.map(({ type }) => type.name))
      )
    )
  }

  render() {
    const { isFetching, data, next, selectedPokemon, filters, appliedFilters } = this.state;
    if (isFetching && !data.length) {
      return <div>Loading...</div>
    }
    const filteredData = this.getFilteredData();
    return (
      <div className="App">
        <Header
          filters={filters}
          toggleFilters={this.toggleFilters}
          appliedFilters={appliedFilters}
          records={filteredData.length}
        />
        <PokemonList
          data={filteredData}
          isFetching={isFetching}
          next={next}
          showDetails={this.showDetails}
        />
        {selectedPokemon && <PokemonDetails data={selectedPokemon} closeDetails={this.closeDetails} />}
      </div>
    );
  }
}


export default App;
