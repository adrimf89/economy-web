import _ from "lodash";
import {
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_LOADING,
  CREATE_TRANSACTION_ERROR,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_LOADING,
  FETCH_TRANSACTIONS_ERROR,
  FETCH_TRANSACTION,
  FETCH_TRANSACTION_LOADING,
  FETCH_TRANSACTION_ERROR,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION
} from "../actions/types";
import { handlePagination } from "../helpers/handlePagination";

const INITIAL_STATE = {
  loading: true,
  error: false,
  list: [],
  transaction: null,
  createLoading: false,
  createError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return {
        list: action.payload.content,
        pagination: handlePagination(action.payload.page, action.payload.links),
        loading: false
      };
    case FETCH_TRANSACTIONS_LOADING:
      return { loading: true };
    case FETCH_TRANSACTIONS_ERROR:
      return { error: true, loading: false };

    case FETCH_TRANSACTION:
      return { transaction: action.payload };
    case FETCH_TRANSACTION_LOADING:
      return { loading: true };
    case FETCH_TRANSACTION_ERROR:
      return { error: true, loading: false };

    case CREATE_TRANSACTION:
      return { createError: false, createLoading: false };
    case CREATE_TRANSACTION_LOADING:
      return { createError: false, createLoading: true };
    case CREATE_TRANSACTION_ERROR:
      return { createError: true, createLoading: false };

    case EDIT_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TRANSACTION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
