import backend from "../apis/backend";
import history from "../history";
import { handleError } from "../helpers/handleError";
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
} from "./types";
import { alertClear } from "./alertsAction";

export const createAccount = formValues => async (dispatch, getState) => {
  dispatch(alertClear());
  dispatch({ type: CREATE_ACCOUNT_LOADING });

  try {
    const response = await backend.post("/api/v1/accounts", formValues);
    dispatch({ type: CREATE_ACCOUNT, payload: response.data });
    history.push("/");
  } catch (error) {
    handleError(error, dispatch);
    dispatch({
      type: CREATE_ACCOUNT_ERROR
    });
  }
};

export const fetchAccounts = params => async (dispatch, getState) => {
  dispatch(alertClear());
  dispatch({ type: FETCH_ACCOUNTS_LOADING });

  try {
    const url = params ? `/api/v1/accounts?${params}` : "/api/v1/accounts";
    const response = await backend.get(url);
    dispatch({ type: FETCH_ACCOUNTS, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
    dispatch({
      type: FETCH_ACCOUNTS_ERROR
    });
  }
};

export const fetchAccount = id => async dispatch => {
  dispatch(alertClear());
  dispatch({ type: FETCH_ACCOUNT_LOADING });

  try {
    const response = await backend.get(`/api/v1/accounts/${id}`);
    dispatch({ type: FETCH_ACCOUNT, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
    dispatch({
      type: FETCH_ACCOUNT_ERROR
    });
  }
};

export const editAccount = (id, formValues) => async dispatch => {
  const response = await backend.patch(`/api/v1/accounts/${id}`, formValues);

  dispatch({ type: EDIT_ACCOUNT, payload: response.data });
  history.push("/");
};
