import React from 'react';
import {render} from 'enzyme';
import _ from 'lodash';
import shortid from 'shortid';

import TodoList from './TodoList';

describe('<TodoList />', () => {
  it('<TodoList /> component should render 5 Todo components', () => {
    const todoList = _.times(5, ()=> {
      return {
        id: shortid.generate(),
        title: '123',
        categoryId: shortid.generate(),
        isDone: true
      };
    });

    const wrapper = render(<TodoList todoList={todoList} removeTodo={_.noop} updateTodo={_.noop}/>);

    expect(wrapper.find('.todo-card').length).toBe(5);
  });

  it('<TodoList /> component should render "Nothing to display..." text', () => {
    const wrapper = render(<TodoList todoList={[]} removeTodo={_.noop} updateTodo={_.noop}/>);

    expect(wrapper.text()).toBe('Nothing to display...');
  });
});
