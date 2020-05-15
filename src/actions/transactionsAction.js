import backend from "../apis/backend";
import history from "../history";
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
} from "./types";
import { alertClear } from "./alertsAction";
import { handleError } from "../helpers/handleError";

export const createTransaction = (formValues, accountId) => async dispatch => {
  dispatch(alertClear());
  dispatch({ type: CREATE_TRANSACTION_LOADING });

  try {
    const response = await backend.post("/api/v1/operations", {
      ...formValues,
      accountId
    });
    dispatch({ type: CREATE_TRANSACTION, payload: response.data });
    history.push(`/accounts/${accountId}/transactions`);
  } catch (error) {
    handleError(error, dispatch);
    dispatch({
      type: CREATE_TRANSACTION_ERROR
    });
  }
};

export const fetchTransactions = accountId => async dispatch => {
  dispatch(alertClear());
  dispatch({ type: FETCH_TRANSACTIONS_LOADING });

  try {
    const response = await backend.get(
      `/api/v1/accounts/${accountId}/operations`
    );
    dispatch({ type: FETCH_TRANSACTIONS, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
    dispatch({
      type: FETCH_TRANSACTIONS_ERROR
    });
  }
};

export const fetchTransaction = id => async dispatch => {
  dispatch(alertClear());
  dispatch({ type: FETCH_TRANSACTION_LOADING });

  try {
    const response = await backend.get(`/api/v1/operations/${id}`);

    dispatch({ type: FETCH_TRANSACTION, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
    dispatch({
      type: FETCH_TRANSACTION_ERROR
    });
  }
};

export const editTransaction = (
  id,
  formValues,
  accountId
) => async dispatch => {
  const response = await backend.patch(`/operations/${id}`, {
    ...formValues,
    accountId
  });

  dispatch({ type: EDIT_TRANSACTION, payload: response.data });
  history.push(`/accounts/${accountId}/transactions`);
};

export const deleteTransaction = (id, accountId) => async dispatch => {
  await backend.delete(`/operations/${id}`);

  dispatch({ type: DELETE_TRANSACTION, payload: id });
  history.push(`/accounts/${accountId}/transactions`);
};
