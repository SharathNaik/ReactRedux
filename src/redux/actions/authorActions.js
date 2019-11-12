import * as types from "./actionTypes";

import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSucess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  //Thunk implementation
  return function (dispatch) {
    dispatch(beginApiCall())
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSucess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error;
      });
  };
}
