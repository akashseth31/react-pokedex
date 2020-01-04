import React from 'react';
import { mount } from 'enzyme';
import Filters, { FilterItem } from './';

const mockProps = {
  filters: {
    name: 'types',
    values: ['poison', 'grass'],
  },
  toggleFilters: jest.fn(),
  appliedFilters: ['poison'],
  records: 100,
};

describe('Filters', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Filters {...mockProps} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render dropdown body when not open', () => {
    expect(wrapper.find('.filter-body')).toHaveLength(0);
  })

  it('should not render dropdown body when not open', () => {
    wrapper.find('.filter-header').first().simulate('click');
    expect(wrapper.find('.filter-body')).toHaveLength(1);
    expect(wrapper.find(FilterItem)).toHaveLength(mockProps.filters.values.length);
  });
});

describe('FilterItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FilterItem {...mockProps} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call toggleFilters when clicked', () => {
    wrapper.find('button').first().simulate('click');
    expect(wrapper.props().toggleFilters).toHaveBeenCalled();
  });
});