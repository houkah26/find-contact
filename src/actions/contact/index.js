import axios from "axios";

import {
  FIND_CONTACT_REQUEST,
  FIND_CONTACT_SUCCESS,
  FIND_CONTACT_FAILURE,
  CLEAR_FIND_CONTACT
} from "../types.js";
import { API_URL } from "../../constants";
import errorHandler from "../handlers/errorHandler";
import { getIsContactRequesting } from "../../reducers/index";

//= =====================
// Contact Action Creators
//= =====================
export const findContact = search => (dispatch, getState) => {
  if (getIsContactRequesting(getState())) {
    return;
  }

  const { searchKey, searchValue } = search;
  const urlParams = `?${searchKey}=${searchValue}`;

  dispatch({
    type: FIND_CONTACT_REQUEST
  });

  axios
    .get(`${API_URL}/contacts${urlParams}`)
    .then(response => {
      dispatch({
        type: FIND_CONTACT_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      errorHandler(dispatch, error, FIND_CONTACT_FAILURE);
    });
};

export const clearFindContact = () => dispatch => {
  dispatch({
    type: CLEAR_FIND_CONTACT
  });
};
