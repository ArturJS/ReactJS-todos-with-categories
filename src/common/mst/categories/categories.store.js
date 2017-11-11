import shortid from 'shortid';
import {extendObservable} from 'mobx';
import {types, destroy} from 'mobx-state-tree';

import {CategoryModel} from './category.model';


const CategoriesStore = types.model('CategoriesStore', {
  categories: types.array(CategoryModel)
})
  .views(self => ({
    findCategoryById(id) {
      return self.categories.find(category => category.id === id);
    },

    get rootCategories() {
      return self.categories.filter(category => category.parent === null);
    }
  }))
  .actions(self => ({
    removeCategory(id) {
      const relatedCategory = self.findCategoryById(id);

      if (relatedCategory && relatedCategory.parent) {
        relatedCategory.parent.childs = relatedCategory.parent.childs.filter(category => category.id !== id);
      }

      const flattenListOfChilds = _getFlattenListOfChilds(relatedCategory);
      const flattenListOfChildsIds = flattenListOfChilds.map(child => child.id);
      const categoryIdsForRemoval = [id, ...flattenListOfChildsIds];

      destroy(relatedCategory);
      flattenListOfChilds.forEach(child => destroy(child));

      self.categories = self.categories.filter(category => categoryIdsForRemoval.indexOf(category.id) === -1);
    },

    addCategory(category) {
      const newCategory = {
        id: shortid.generate(),
        childs: [],
        parent: null,
        isExpanded: false,
        ...category
      };

      self.categories.push(newCategory);

      if (category.parent) {
        category.parent.childs.push(newCategory.id);
      }
    },

    updateCategory({id, ...category}) {
      extendObservable(
        self.findCategoryById(id),
        category
      );
    },

    toggleExpandCategory(id, isExpanded) {
      const category = self.findCategoryById(id);

      if (typeof isExpanded === 'undefined') {
        isExpanded = !category.isExpanded;
      }

      category.isExpanded = isExpanded;
    }
  }));

export const categoriesStore = CategoriesStore.create({categories: []});

function _getFlattenListOfChilds(category) {
  _getFlattenListOfChildsImpl.flattenList = [];
  _getFlattenListOfChildsImpl(category);
  return _getFlattenListOfChildsImpl.flattenList;
}

function _getFlattenListOfChildsImpl(category) {
  _getFlattenListOfChildsImpl.flattenList.push(...category.childs);
  category.childs.forEach(childCategory => _getFlattenListOfChildsImpl(childCategory));
}
