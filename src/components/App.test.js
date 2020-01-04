import React from 'react';
import { shallow } from 'enzyme';
import { flattenDeep, uniq } from 'lodash';
import App from './App';
import PokemonList from './PokemonList';
import Header from './Header';
import PokemonDetails from './PokemonDetails';
import { data } from './../helpers/mock-data';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.setState({
      isFetching: false,
      data,
    });
    wrapper.update();
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
  });

  it('calls getPokedexData', () => {
    jest.spyOn(App.prototype, 'getPokedexData');
    wrapper = shallow(<App />);
    expect(App.prototype.getPokedexData.mock.calls.length).toBe(1);
  });

  it('shows loader when no data available', () => {
    wrapper.setState({
      isFetching: true,
      data: [],
    });
    wrapper.update();
    expect(wrapper.containsMatchingElement(<div>Loading...</div>)).toBeTruthy();
  });

  it('should render list if data availbale', () => {
    expect(wrapper.containsMatchingElement(<div>Loading...</div>)).toBeFalsy();
    expect(wrapper.find(PokemonList)).toHaveLength(1)
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(PokemonDetails)).toHaveLength(0);
  });

  it('should render Pokemon details overlay if pokemon selected', () => {
    wrapper.setState({
      selectedPokemon: data[0]
    });
    wrapper.update();
    expect(wrapper.find(PokemonDetails)).toHaveLength(1);
  })

  it('should fetch pokemon details when called', () => {
    jest.spyOn(App.prototype, 'getPokemonDetail');
    wrapper.instance().getPokemonDetail(data[0].url);
    expect(App.prototype.getPokemonDetail.mock.calls.length).toBe(1);
  });

  it('should open detail overlay when showDetails called', () => {
    wrapper.instance().showDetails(data[0].name);
    expect(wrapper.find(PokemonDetails)).toHaveLength(1);
  });

  it('should open detail overlay when showDetails called', () => {
    const filters = wrapper.instance().extractTypeFilters(data);
    const expectedValue = {
      name: 'types',
      values: uniq(flattenDeep(data.map(({ details }) => details.types.map(({ type }) => type.name)))),
    };
    expect(filters).toEqual(expectedValue);
  });

  it('should call getPokedexData when window scroll to bottom', () => {
    wrapper.setState({
      next: 'mock-url',
    });
    wrapper.update();
    global.document.scrollTo = global.document.documentElement.offsetHeight;
    expect(App.prototype.getPokedexData).toHaveBeenCalled();
  });

  it('should toggleFilters', () => {
    wrapper.setState({
      appliedFilters: [],
    });
    wrapper.update();
    wrapper.instance().toggleFilters('poison');
    expect(wrapper.state().appliedFilters).toEqual(['poison']);
    wrapper.instance().toggleFilters('poison');
    expect(wrapper.state().appliedFilters).toEqual([]);
  });

  it('should set selectedPokemon to null when overlay closed', () => {
    wrapper.instance().closeDetails();
    expect(wrapper.state().selectedPokemon).toEqual(null);
  });

});
