import React from 'react';
import {mount, render} from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';
import shortid from 'shortid';

import Todo from './Todo';

describe('<Todo />', () => {
  it('<Todo /> component should render whole data properly', () => {
    const todo = {
      id: shortid.generate(),
      title: '123',
      categoryId: shortid.generate(),
      isDone: true
    };

    const wrapper = render(<Todo todo={todo} removeTodo={_.noop} updateTodo={_.noop}/>);

    expect(wrapper.find('.todo-title-link').text()).toBe('123');
    expect(wrapper.find('.chbx').get(0).attribs.checked).toBeDefined();
  });


  it('<Todo /> component should invoke updateTodo and removeTodo methods', () => {
    const todo = {
      id: shortid.generate(),
      title: '123',
      categoryId: shortid.generate(),
      isDone: true
    };
    const onRemoveTodo = sinon.spy();
    const onUpdateTodo = sinon.spy();

    const wrapper = mount(<Todo todo={todo} removeTodo={onRemoveTodo} updateTodo={onUpdateTodo}/>);

    wrapper.find('.todo-remove').simulate('click');
    wrapper.find('.chbx').simulate('change');

    expect(onRemoveTodo.callCount).toBe(1);
    expect(onUpdateTodo.callCount).toBe(1);
  });
});
