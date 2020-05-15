import backend from "../apis/backend";
import history from "../history";
import {
  CREATE_CATEGORY,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  EDIT_CATEGORY
} from "./types";

export const createCategory = formValues => async dispatch => {
  const response = await backend.post(
    "/api/v1/operation-categories",
    formValues
  );

  dispatch({ type: CREATE_CATEGORY, payload: response.data });
  history.push("/");
};

export const fetchCategories = () => async dispatch => {
  const response = await backend.get(`/api/v1/operation-categories`);

  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};

export const fetchCategory = id => async dispatch => {
  const response = await backend.get(`/api/v1/operation-categories/${id}`);

  dispatch({ type: FETCH_CATEGORY, payload: response.data });
};

export const editCategory = (id, formValues) => async dispatch => {
  const response = await backend.patch(
    `/api/v1/operation-categories/${id}`,
    formValues
  );

  dispatch({ type: EDIT_CATEGORY, payload: response.data });
  history.push("/");
};
