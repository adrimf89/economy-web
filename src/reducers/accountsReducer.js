import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_LOADING,
  CREATE_ACCOUNT_ERROR,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_LOADING,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_LOADING,
  FETCH_ACCOUNT_ERROR,
  EDIT_ACCOUNT
} from "../actions/types";
import { handlePagination } from "../helpers/handlePagination";

const INITIAL_STATE = {
  loading: true,
  error: false,
  data: [],
  account: null,
  createLoading: false,
  createError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return {
        data: action.payload.content,
        pagination: handlePagination(action.payload.page, action.payload.links),
        loading: false
      };
    case FETCH_ACCOUNTS_LOADING:
      return { loading: true };
    case FETCH_ACCOUNTS_ERROR:
      return { error: true, loading: false };

    case FETCH_ACCOUNT:
      return { account: action.payload, loading: false, error: false };
    case FETCH_ACCOUNT_LOADING:
      return { loading: true };
    case FETCH_ACCOUNT_ERROR:
      return { error: true, loading: false };

    case CREATE_ACCOUNT:
      return { createError: false, createLoading: false };
    case CREATE_ACCOUNT_LOADING:
      return { createError: false, createLoading: true };
    case CREATE_ACCOUNT_ERROR:
      return { createError: true, createLoading: false };

    case EDIT_ACCOUNT:
      return { ...state, [action.payload.id]: action.payload };
    //case DELETE_STREAM:
    //  return _.omit(state, action.payload);
    default:
      return state;
  }
};
