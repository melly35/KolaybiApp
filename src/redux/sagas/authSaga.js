
import { put, call, takeLatest, all } from 'redux-saga/effects'
import { AuthLogin, AuthRegister, errMsgList } from '../../services/api'

import Toast from 'react-native-toast-message';
import ActionTypes from '../actionTypes';
import * as NavigationService from '../../services/NavigationService';

function* handleAuthLogin(payload) {

  try {
    const { email, password } = payload.payload
    const response = yield call(AuthLogin, email, password);
    let respData = response.data;
    
    if (respData.success) {
      Toast.show({ type: 'cSuccess', text1: respData.msg, visibilityTime: 1500 })
      yield put({ type: ActionTypes.auth.LOGIN_SUCCESS, response: respData.user })
      NavigationService.navigate('HomeScreen');
    } else {
      Toast.show({
        type: 'cError',
        text1: 'UNAUTHORIZED',
        text2: errMsgList(error.response.data.msg),
        visibilityTime: 2000,
      })
      yield put({ type: ActionTypes.auth.LOGIN_ERROR })
    }

  } catch (error) {
    console.warn(error)
    Toast.show({
      type: 'cWarning',
      text1: 'UNAUTHORIZED',
      text2: '',
      visibilityTime: 2000,
    })
    yield put({ type: ActionTypes.auth.LOGIN_ERROR, error })
  }
}

function* handleAuthRegister(payload) {

  try {
    const { name, email, password } = payload.payload 
    const response = yield call(AuthRegister, name, email, password);
    let respData = response.data;
    
    if (respData.success) {
      Toast.show({ type: 'cSuccess', text1: respData.msg, visibilityTime: 1500 })
      yield put({ type: ActionTypes.auth.REGISTER_SUCCESS, response: [] })
      NavigationService.navigate('LoginScreen');
    } else {
      Toast.show({
        type: 'cError',
        text1: 'Not Register',
        text2: error.response.data.msg,
        visibilityTime: 3000,
      })
      yield put({ type: ActionTypes.auth.REGISTER_ERROR })
    }

  } catch (error) { 
    let errMsg = errMsgList(error); 
    Toast.show({
      type: 'cWarning',
      text1: 'Not Register',
      text2: errMsg,
      visibilityTime: 2000,
    }) 

    yield put({ type: ActionTypes.auth.REGISTER_ERROR, error })
  }
}

function* handleAuthLogout(payload) {
  try {
    yield put({ type: ActionTypes.auth.LOGOUT_SUCCESS })
    NavigationService.navigate('LoginScreen');
  } catch (err) { 
  }
  
}

const authSaga = [
  takeLatest(ActionTypes.auth.LOGIN, handleAuthLogin),
  takeLatest(ActionTypes.auth.REGISTER, handleAuthRegister),
  takeLatest(ActionTypes.auth.LOGOUT, handleAuthLogout)
]

export default authSaga;