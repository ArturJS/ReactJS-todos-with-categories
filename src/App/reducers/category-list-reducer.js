import * as types from '../actions/action-types';
import * as _ from 'lodash';
import {findRelatedCategory} from '../helpers/category.helpers';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return [action.category, ...state];
    case types.ADD_SUBCATEGORY: {
      let newCategoryList = _.cloneDeep(state);
      let relatedCategory = findRelatedCategory(newCategoryList, action.relatedCategoryId);

      relatedCategory.childs.push(
        Object.assign(action.subcategory, {name: relatedCategory.name + '-' + (relatedCategory.childs.length + 1)})
      );

      return newCategoryList;
    }
    case types.REMOVE_CATEGORY : {
      let newCategoryList = _.cloneDeep(state);
      let {category} = action;
      let categoryId = category.id;

      let parent = findRelatedCategory(newCategoryList, category.parentId);

      _.remove(parent ? parent.childs : newCategoryList, o => o.id === categoryId);
      return newCategoryList;
    }
    case types.UPDATE_CATEGORY_LIST:
      return _.cloneDeep(action.categoryList);
    default:
      return state;
  }
};
