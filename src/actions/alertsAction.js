import { ALERT_INFO, ALERT_ERROR, ALERT_CLEAR } from "./types";

export const alertInfo = (header, message) => {
  return {
    type: ALERT_INFO,
    header: header,
    message: message
  };
};

export const alertError = (header, message) => {
  return {
    type: ALERT_ERROR,
    header: header,
    message: message
  };
};

export const alertClear = () => {
  return {
    type: ALERT_CLEAR
  };
};
