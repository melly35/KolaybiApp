import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import generalReducer from './generalReducer';

const reducers = combineReducers({
    authReducer: authReducer,
    productReducer: productReducer,
    generalReducer: generalReducer,
});

export default reducers;