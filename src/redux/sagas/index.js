import { all } from 'redux-saga/effects';


import authSaga from './authSaga';
import productSaga from './productSaga';
import generalSaga from './generalSaga';

export default function* rootSaga() {
    yield all([...authSaga, ...productSaga, ...generalSaga]); //yield all([...authSaga, ...messagesSaga]);
}