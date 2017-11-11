import {types} from 'mobx-state-tree';

export const CategoryModel = types.model('CategoryModel', {
  id: types.identifier(),
  name: types.string,
  childs: types.array(types.reference(types.late(() => CategoryModel))),
  parent: types.maybe(types.reference(types.late(() => CategoryModel))),
  isExpanded: types.boolean
});
