import React from 'react';
import { mount } from 'enzyme';
import Header from './';
import Filters from '../Filters';

describe('Header', () => {
  const mockProps = {
    filters: ['gross', 'poison'],
    toggleFilters: jest.fn(),
    appliedFilters: ['poison'],
    records: 100,
  }
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Header {...mockProps} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render logo text', () => {
    expect(wrapper.containsMatchingElement(<h2>Pokedex</h2>)).toBeTruthy();
  });

  it('should render filters block', () => {
    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find(Filters)).toHaveLength(1);
  });

  it('should not render filters block when no filters', () => {
    wrapper.setProps({
      filters: [],
    })
    expect(wrapper.find('aside')).toHaveLength(0);
    expect(wrapper.find(Filters)).toHaveLength(0);
  });
});