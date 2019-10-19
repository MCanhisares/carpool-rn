import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import driver from '../modules/driver/DriverState';
import app from '../modules/AppState';

export default combineReducers({
  // ## Generator Reducers  
  app,  
  driver
});
