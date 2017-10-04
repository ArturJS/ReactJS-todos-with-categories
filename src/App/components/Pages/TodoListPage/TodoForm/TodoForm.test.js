import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import TodoForm from './TodoForm';

xdescribe('<TodoForm />', () => {
  it('<TodoForm /> component should invoke addTodo method', () => {
    const onAddTodo = sinon.spy();

    const wrapper = mount(<TodoForm addTodo={onAddTodo}/>);

    wrapper.find('.todo-title-field').get(0).value = 'todo1';
    wrapper.find('.todo-form').simulate('submit');

    expect(onAddTodo.callCount).toBe(1);
  });

  it('<TodoForm /> component should NOT invoke addTodo method when text input is empty', () => {
    const onAddTodo = sinon.spy();

    const wrapper = mount(<TodoForm addTodo={onAddTodo}/>);

    wrapper.find('.todo-title-field').get(0).value = '';
    wrapper.find('.todo-form').simulate('submit');

    expect(onAddTodo.callCount).toBe(0);
  });
});
