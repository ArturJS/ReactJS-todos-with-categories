import _ from 'lodash';
import {findRelatedCategory} from '../../../helpers/category.helpers';
import shortid from 'shortid'; // todo use server api

const ACTION_PREFIX = 'reactjs-learning/Category/';
const UPDATE_CATEGORY_LIST = `${ACTION_PREFIX}UPDATE_CATEGORY_LIST`;
const REMOVE_CATEGORY = `${ACTION_PREFIX}REMOVE_CATEGORY`;
const REMOVE_CATEGORY_TODOS = `${ACTION_PREFIX}REMOVE_CATEGORY_TODOS`;
const ADD_CATEGORY = `${ACTION_PREFIX}ADD_CATEGORY`;


const ADD_SUBCATEGORY = `${ACTION_PREFIX}ADD_SUBCATEGORY`;

export const updateCategoryList = (categoryList) => {
  return {
    type: UPDATE_CATEGORY_LIST,
    categoryList: JSON.parse(JSON.stringify(categoryList))
  };
};

export const removeCategory = (category) => {
  return {
    type: REMOVE_CATEGORY,
    category
  };
};

export const removeCategoryTodos = (category) => {
  return {
    type: REMOVE_CATEGORY_TODOS,
    category
  };
};

export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category: {
      id: shortid.generate(),
      parentId: null,
      childs: [],
      ...category
    }
  };
};

export const addSubCategory = (relatedCategoryId) => {
  return {
    type: ADD_SUBCATEGORY,
    subcategory: {
      id: shortid.generate(),
      name: '',
      parentId: relatedCategoryId,
      childs: []
    },
    relatedCategoryId
  };
};


export default (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [action.category, ...state];
    case ADD_SUBCATEGORY: {
      let newCategoryList = _.cloneDeep(state);
      let relatedCategory = findRelatedCategory(newCategoryList, action.relatedCategoryId);

      relatedCategory.childs.push(
        Object.assign(action.subcategory, {name: relatedCategory.name + '-' + (relatedCategory.childs.length + 1)})
      );

      return newCategoryList;
    }
    case REMOVE_CATEGORY : {
      let newCategoryList = _.cloneDeep(state);
      let {category} = action;
      let categoryId = category.id;

      let parent = findRelatedCategory(newCategoryList, category.parentId);

      _.remove(parent ? parent.childs : newCategoryList, o => o.id === categoryId);
      return newCategoryList;
    }
    case UPDATE_CATEGORY_LIST:
      return _.cloneDeep(action.categoryList);
    default:
      return state;
  }
};
