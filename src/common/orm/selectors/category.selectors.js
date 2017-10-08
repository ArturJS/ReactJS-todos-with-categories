import {createSelector} from 'redux-orm';
import orm from '../orm.schema';

export const rootCategoryIds = createSelector(orm, state => state.orm, session => {
  return session.Category
    .filter(category => !category.parentId)
    .toRefArray()
    .map(category => category.id);
});

export const categoryById = (categoryId) => createSelector(orm, state => state.orm, session => {
  return session.Category.withId(categoryId).ref;
});
