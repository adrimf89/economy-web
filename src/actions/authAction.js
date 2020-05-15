import backend from "../apis/backend";
import history from "../history";
import { handleError } from "../helpers/handleError";
import { SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from "./types";

export const signIn = formValues => async (dispatch, getState) => {
  //dispatch({ type: SIGN_IN_REQUEST });

  try {
    const response = await backend.post("/login", formValues);

    localStorage.setItem("token", JSON.stringify(response.data.token));
    dispatch({ type: SIGN_IN, payload: response.data.username });
    history.push("/");
  } catch (error) {
    dispatch({ type: SIGN_IN_ERROR, payload: handleError(error) });
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  history.push("/login");
  return {
    type: SIGN_OUT
  };
};
