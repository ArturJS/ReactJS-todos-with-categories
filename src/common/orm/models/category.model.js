import {attr, Model} from 'redux-orm';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY
} from '../actions/action-types';


export default class Category extends Model {
  static modelName = 'Category';
  static fields = {
    id: attr(),
    name: attr(),
    childs: attr(),
    parentId: attr(),
    isExpanded: attr()
  };

  static reducer(action, Category, session) {
    const {type, payload} = action;

    switch (type) {
      case ADD_CATEGORY: {
        const {
          category
        } = payload;

        Category.create(category);

        if (category.parentId) {
          const parentCategory = Category.withId(category.parentId);
          const {childs} = parentCategory.ref;
          parentCategory.update({childs: [...childs, category.id]});
        }

        console.log(Category.all().toRefArray());
        break;
      }
      case REMOVE_CATEGORY: {
        Category.withId(payload.categoryId).deleteCascade(session);
        break;
      }
      case UPDATE_CATEGORY: {
        const {category} = payload;
        Category.withId(category.id).update(category);
        break;
      }
      default:
        break;
    }
  };

  deleteCascade(session) {
    const {
      id,
      childs,
      parentId
    } = this;

    session.Todo
      .all()
      .filter(todo => todo.categoryId === id)
      .delete();

    session.Category
      .all()
      .toModelArray()
      .filter(category => childs.indexOf(category.id) > -1)
      .forEach(category => category.deleteCascade(session));

    if (parentId) {
      const parentCategory = session.Category.withId(parentId);
      const childs = parentCategory.childs.filter(categoryId => categoryId !== id);
      parentCategory.update({childs});
    }

    this.delete();
  }
}
