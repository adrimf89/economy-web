import { FETCH_MONTH_BOARD } from '../actions/types';

const INTIAL_STATE = {
    selectedDate: new Date(),
    showPlanned: false,
    statistic: {}
  };

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MONTH_BOARD:
      return { ...state, 
        selectedDate: action.payload.selectedDate, 
        showPlanned: action.payload.showPlanned, 
        statistic: action.payload.statistics };
    default:
      return state;
  }
};