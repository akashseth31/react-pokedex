import React from 'react';
import { mount } from 'enzyme';
import { data } from '../../helpers/mock-data'
import PokemonDetails from './';
import { NOT_FOUND } from '../../helpers/AppConstants';

describe('PokemonDetails', () => {
  const mockProps = {
    data: data[0],
    closeDetails: jest.fn(),
  }
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PokemonDetails {...mockProps} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct name", () => {
    expect(wrapper.find('h4').first().text()).toEqual(`NAME: ${mockProps.data.name}`);
  });

  it("should render correct background-image", () => {
    const url = mockProps.data.details.sprites.front_default || NOT_FOUND;
    expect(wrapper.find('aside').first().prop('style')).toHaveProperty('backgroundImage', `url(${url})`);
  });

  it("should call closeDetails", () => {
    wrapper.find('button').first().simulate('click');
    expect(wrapper.props().closeDetails).toHaveBeenCalled();
  });
});