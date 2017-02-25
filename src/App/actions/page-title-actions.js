import {UPDATE_PAGE_TITLE} from './action-types';

export const updatePageTitle = (pageTitle) => {
  return {
    type: UPDATE_PAGE_TITLE,
    payload: pageTitle
  }
};
