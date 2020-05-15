 
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import statisticsReducer from './statisticsReducer';
import alertsReducer from './alertsReducer';
import accountsReducer from './accountsReducer';
import transactionsReducer from './transactionsReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  form: formReducer,
  stats: statisticsReducer,
  alerts: alertsReducer,
  categories: categoriesReducer
});