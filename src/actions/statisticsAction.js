import backend from '../apis/backend';
import { 
    FETCH_MONTH_BOARD,
    ALERT_CLEAR,
    ALERT_ERROR } from './types';


  export const fetchMonthBoard = (date, showPlanned) => async dispatch => {
    dispatch({ type: ALERT_CLEAR });
    
    const month = date.getFullYear() +""+ (date.getMonth()+1);
    
    let data = {
        statistics: {},
        selectedDate: date,
        showPlanned: showPlanned
    };

    try {
        const response = await backend.get(`/statistics/${month}`);

        data = {
            statistics: response.data,
            selectedDate: date,
            showPlanned: showPlanned
        };
    } catch (error) {
        dispatch({ type: ALERT_ERROR, header: 'Missing data', messageList: ['There is no data for selected month'] });
    }

    dispatch({ type: FETCH_MONTH_BOARD, payload: data });
  };