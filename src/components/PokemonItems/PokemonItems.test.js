import React from 'react';
import { mount } from 'enzyme';
import { data } from '../../helpers/mock-data'
import PokemonItems from './';
import { NOT_FOUND } from '../../helpers/AppConstants';

describe('PokemonItems', () => {
  const mockProps = {
    data: data[0],
    showDetails: jest.fn(),
  }
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PokemonItems {...mockProps} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct name", () => {
    expect(wrapper.find('.short-detail').first().text()).toEqual(mockProps.data.name);
  });

  it("should render correct background-image", () => {
    const url = mockProps.data.details.sprites.front_default || NOT_FOUND;
    expect(wrapper.find('.items').first().prop('style')).toHaveProperty('backgroundImage', `url(${url})`);
  });

  it("should call showDetails", () => {
    wrapper.find('.items').first().simulate('click');
    expect(wrapper.props().showDetails).toHaveBeenCalled();
  });
});