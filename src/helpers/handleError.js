import _ from "lodash";
import { alertError } from "../actions/alertsAction";

export const handleError = (error, dispatch) => {
  let errorResponse = {
    error: "Internal Server Error",
    message: "There was an error. Please try again later",
    status: 500
  };

  if (error.response) {
    if (_.isEmpty(error.response.data) && error.response.status) {
      errorResponse = {
        error: error.response.status,
        message: error.response.message,
        status: error.response.status
      };
    } else {
      errorResponse = error.response.data;
    }
  }

  dispatch(alertError("Error", errorResponse.message));

  return errorResponse;
};
