
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import loadingReducer from './reducers/loading';
import dataTableReducer from './reducers/datatable'
import loginReducer from './reducers/login'
import dataTableReducer1 from './reducers/datatable1'
import SnackbarReducer from './reducers/snackerbar'
const store = createStore(
    combineReducers({
        loadingReducer,
        dataTableReducer,
        loginReducer,
        dataTableReducer1,
        SnackbarReducer,
    }),
    {},
    applyMiddleware(thunk, logger)
);
export default store