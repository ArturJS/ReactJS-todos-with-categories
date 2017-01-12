export function getAllChildCategoryIds(category) {
  getAllChildCategoryIds.categoryIds = [];
  getAllChildCategoryIdsImpl(category);

  return getAllChildCategoryIds.categoryIds;
}

function getAllChildCategoryIdsImpl(category) {
  if (category.childs.length === 0) return;

  let ownChildIds = category.childs.map(category => category.id);
  getAllChildCategoryIds.categoryIds = [...getAllChildCategoryIds.categoryIds, ...ownChildIds];

  for (let category of category.childs) {
    getAllChildCategoryIdsImpl(category);
  }
}
