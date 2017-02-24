import _ from 'lodash';

export function findRelatedCategory(categoryList, categoryId) {
  let relatedCategory = _.find(categoryList, (o)=> o.id === categoryId);

  if (relatedCategory) {
    return relatedCategory;
  }

  let hasChildsList = categoryList.filter(o => o.childs.length > 0);

  if (hasChildsList.length > 0) {
    for (let category of hasChildsList) {
      relatedCategory = findRelatedCategory(category.childs, categoryId);

      if (relatedCategory) {
        return relatedCategory;
      }
    }
  } else {
    return null;
  }

}

export function getAllChildCategoryIds(category) {
  getAllChildCategoryIds.categoryIds = [];
  getAllChildCategoryIdsImpl(category);

  return getAllChildCategoryIds.categoryIds;
}


///implementation

function getAllChildCategoryIdsImpl(category) {
  if (category.childs.length === 0) return;

  let ownChildIds = category.childs.map(category => category.id);
  getAllChildCategoryIds.categoryIds = [...getAllChildCategoryIds.categoryIds, ...ownChildIds];

  for (let categoryItem of category.childs) {
    getAllChildCategoryIdsImpl(categoryItem);
  }
}
