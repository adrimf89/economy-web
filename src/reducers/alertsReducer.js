import { ALERT_INFO, ALERT_ERROR, ALERT_CLEAR } from "../actions/types";

const INTIAL_STATE = {
  info: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ALERT_INFO:
      return {
        ...state,
        info: {
          type: "info",
          header: action.header,
          message: action.message
        }
      };
    case ALERT_ERROR:
      return {
        ...state,
        info: {
          type: "error",
          header: action.header,
          message: action.message
        }
      };
    case ALERT_CLEAR:
      return { ...state, info: null };
    default:
      return state;
  }
};
