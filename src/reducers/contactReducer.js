import { combineReducers } from "redux";

import {
  FIND_CONTACT_REQUEST,
  FIND_CONTACT_SUCCESS,
  FIND_CONTACT_FAILURE,
  CLEAR_FIND_CONTACT
} from "../actions/types.js";

const contact = () => {
  const result = (state = [], action) => {
    switch (action.type) {
      case FIND_CONTACT_SUCCESS:
        const data = action.payload;
        return data;
      case CLEAR_FIND_CONTACT:
      case FIND_CONTACT_FAILURE:
      case FIND_CONTACT_REQUEST:
        return {};
      default:
        return state;
    }
  };

  const isRequesting = (state = false, action) => {
    switch (action.type) {
      case FIND_CONTACT_REQUEST:
        return true;
      case FIND_CONTACT_SUCCESS:
      case FIND_CONTACT_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = "", action) => {
    switch (action.type) {
      case FIND_CONTACT_REQUEST:
      case FIND_CONTACT_SUCCESS:
      case CLEAR_FIND_CONTACT:
        return "";
      case FIND_CONTACT_FAILURE:
        return action.payload;
      default:
        return state;
    }
  };

  return combineReducers({ result, isRequesting, errorMessage });
};

export default contact;

export const getMatches = state => state.result;
export const getIsRequesting = state => state.isRequesting;
export const getErrorMessage = state => state.errorMessage;
