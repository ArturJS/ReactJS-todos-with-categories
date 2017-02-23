import React from 'react';
import {render, mount} from 'enzyme';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TodoForm from './TodoForm';

injectTapEventPlugin();

describe('<TodoForm />', () => {
  it('<TodoForm /> component should invoke addTodo method', () => {
    const onAddTodo = sinon.spy();

    const wrapper = mount(
      <MuiThemeProvider>
        <TodoForm addTodo={onAddTodo}/>
      </MuiThemeProvider>
    );

    wrapper.find('.todo-title-field').get(0).value = 'todo1';
    wrapper.find('.todo-form').simulate('submit');

    expect(onAddTodo.callCount).toBe(1);
  });

  it('<TodoForm /> component should NOT invoke addTodo method when text input is empty', () => {
    const onAddTodo = sinon.spy();

    const wrapper = mount(
      <MuiThemeProvider>
        <TodoForm addTodo={onAddTodo}/>
      </MuiThemeProvider>
    );

    wrapper.find('.todo-title-field').get(0).value = '';
    wrapper.find('.todo-form').simulate('submit');

    expect(onAddTodo.callCount).toBe(0);
  });
});
