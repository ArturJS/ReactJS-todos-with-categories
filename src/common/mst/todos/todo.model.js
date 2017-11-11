import {types} from 'mobx-state-tree';

import {CategoryModel} from '../categories/category.model';


export const TodoModel = types.model('TodoModel', {
  id: types.identifier(),
  title: types.string,
  isDone: types.boolean,
  description: types.string,
  category: types.reference(CategoryModel)
});
