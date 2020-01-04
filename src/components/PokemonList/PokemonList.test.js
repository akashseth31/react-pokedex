import React from 'react';
import { mount } from 'enzyme';
import { data } from '../../helpers/mock-data'
import PokemonList from './';
import PokemonItems from '../PokemonItems';

describe('PokemonList', () => {
  const mockProps = {
    data,
    isFetching: false,
    next: 'mock-url',
    showDetails: jest.fn(),
  }
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PokemonList {...mockProps} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render all PokemonItems', () => {
    expect(wrapper.find(PokemonItems)).toHaveLength(data.length);
  });

  it('should render loader bar if data is fetching', () => {
    expect(wrapper.find('.list-footer')).toHaveLength(0);
    wrapper.setProps({
      isFetching: true,
    });
    wrapper.update();
    expect(wrapper.find('.list-footer')).toHaveLength(1);
    expect(wrapper.find('.list-footer').first().text()).toEqual('Fetching more data...');
  });

  it('should render end of the list message when next is null', () => {
    expect(wrapper.find('.list-footer')).toHaveLength(0);
    wrapper.setProps({
      next: null,
    });
    wrapper.update();
    expect(wrapper.find('.list-footer')).toHaveLength(1);
    expect(wrapper.find('.list-footer').first().text()).toEqual(`That's end of the list!`);
  });
});