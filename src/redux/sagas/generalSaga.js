
import { put, call, takeLatest, all } from 'redux-saga/effects'
import { GetOrders, GetCarts, CreateOrder, errMsgList } from '../../services/api'

import Toast from 'react-native-toast-message';
import ActionTypes from '../actionTypes';
import * as NavigationService from '../../services/NavigationService';
import { acc } from 'react-native-reanimated';

function* handleGetOrders(payload) { 
  try {
    const { accessToken } = payload.payload 
    const response = yield call(GetOrders, accessToken);
    let respData = response.data;
    
      yield put({ type: ActionTypes.general.GET_ORDERS_SUCCESS, response: respData.data })
    

  } catch (error) {
    Toast.show({
      type: 'cWarning',
      text1: 'Opss',
      text2: error.response.data.msg,
      visibilityTime: 3000,
    })
    yield put({ type: ActionTypes.general.GET_ORDERS_ERROR, error })
  }
}

function* handleGetCarts(payload) { 
  try {
    const { accessToken } = payload.payload 
    const response = yield call(GetCarts, accessToken);
    let respData = response.data; 
    yield put({ type: ActionTypes.general.GET_CARTS_SUCCESS, response: respData.data })
    

  } catch (error) {  
    yield put({ type: ActionTypes.general.GET_CARTS_ERROR, error })
  }
}

function* handleCreateOrder(payload) { 
  try {
    const { orderCustomerName, orderCustomerAddress, accessToken } = payload.payload 
    const response = yield call(CreateOrder, orderCustomerName, orderCustomerAddress, accessToken);
    let respData = response.data;
    
    if (respData.success) {
      Toast.show({ type: 'cSuccess', text1: respData.msg, visibilityTime: 1500 })
      yield put({ type: ActionTypes.general.CREATE_ORDER_SUCCESS})
      NavigationService.navigate('HomeScreenTab');
    } else { 
      Toast.show({
        type: 'cError',
        text1: 'Not Created Order',
        text2: error.response.data.msg,
        visibilityTime: 2000,
      })
      yield put({ type: ActionTypes.auth.CREATE_ORDER_ERROR })
    }
    

  } catch (error) {
    NavigationService.navigate('HomeScreenTab');
    Toast.show({
      type: 'cWarning',
      text1: 'Not Created Order',
      text2: error.response.data.msg,
      visibilityTime: 2000,
    })
    yield put({ type: ActionTypes.general.CREATE_ORDER_ERROR, error })
  }
}

const generalSaga = [
  takeLatest(ActionTypes.general.GET_ORDERS, handleGetOrders),
  takeLatest(ActionTypes.general.GET_CARTS, handleGetCarts),
  takeLatest(ActionTypes.general.CREATE_ORDER, handleCreateOrder),
]

export default generalSaga;