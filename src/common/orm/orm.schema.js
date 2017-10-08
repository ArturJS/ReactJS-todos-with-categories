import {ORM} from 'redux-orm';
import CategoryModel from './models/category.model';
import TodoModel from './models/todo.model';

const orm = new ORM();
orm.register(CategoryModel, TodoModel);

export default orm;

