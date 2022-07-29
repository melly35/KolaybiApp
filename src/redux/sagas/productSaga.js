
import { put, call, takeLatest, all } from 'redux-saga/effects'
import { AddProduct, GetCategories, GetSubCategories, GetProducts, AddCart, errMsgList } from '../../services/api'

import Toast from 'react-native-toast-message';
import ActionTypes from '../actionTypes';
import * as NavigationService from '../../services/NavigationService';

function* handleAddProduct(payload) {
  try {
    const { productBarcode, productName, productPrice, mainCategoryId, subCategoryId, productDesc, accessToken } = payload.payload
    const response = yield call(AddProduct, productBarcode, productName, productPrice, mainCategoryId, subCategoryId, productDesc, accessToken);
    let respData = response.data;

    if (respData.success) {
      Toast.show({
        type: 'cSuccess',
        text1: 'Created Product Successfully',
        visibilityTime: 1000,
      })
      yield put({ type: ActionTypes.product.ADD_PRODUCT_SUCCESS })
    } else {
      yield put({ type: ActionTypes.product.ADD_PRODUCT_ERROR })
    }

  } catch (error) {
    let errMsg = errMsgList(error);
    Toast.show({
      type: 'cWarning',
      text1: 'Not Created Product',
      text2: errMsg,
      visibilityTime: 3000,
    })
    yield put({ type: ActionTypes.product.ADD_PRODUCT_ERROR, error })
  }
}

function* handleGetCategories(payload) {
  try {
    const { accessToken } = payload.payload
    const response = yield call(GetCategories, accessToken);
    let respData = response.data; 
    if (respData.success) {
      yield put({ type: ActionTypes.product.GET_CATEGORIES_SUCCESS, response: respData.data })
    } else {
      yield put({ type: ActionTypes.product.GET_CATEGORIES_ERROR })
    }

  } catch (error) {
    let errMsg = errMsgList(error);
    Toast.show({
      type: 'cWarning',
      text1: 'Not Found Category',
      text2: errMsg,
      visibilityTime: 3000,
    })
    yield put({ type: ActionTypes.product.GET_CATEGORIES_ERROR, error })
  }
}

function* handleGetSubCategories(payload) {
  try {
    const { accessToken } = payload.payload
    const response = yield call(GetSubCategories, accessToken);
    let respData = response.data; 
    if (respData.success) {
      yield put({ type: ActionTypes.product.GET_SUB_CATEGORIES_SUCCESS, response: respData.data })
    } else {
      yield put({ type: ActionTypes.product.GET_SUB_CATEGORIES_ERROR })
    }

  } catch (error) {
    let errMsg = errMsgList(error);
    Toast.show({
      type: 'cWarning',
      text1: 'Not Found Sub Category',
      text2: errMsg,
      visibilityTime: 3000,
    })
    yield put({ type: ActionTypes.product.GET_SUB_CATEGORIES_ERROR, error })
  }
}

function* handleGetProducts(payload) { 
  try {
    const { query, price, category, accessToken } = payload.payload
    const response = yield call(GetProducts, query, price, category, accessToken);
    let respData = response.data;  
    if (respData.success) {
      yield put({ type: ActionTypes.product.GET_PRODUCTS_SUCCESS, response: respData.data })
    } else {
      yield put({ type: ActionTypes.product.GET_PRODUCTS_ERROR })
    }

  } catch (error) { 
    yield put({ type: ActionTypes.product.GET_PRODUCTS_ERROR, error })
  }
}


function* handleAddCart(payload) { 
  try {
    const { productId, count, accessToken } = payload.payload
    const response = yield call(AddCart, productId, count, accessToken);
    let respData = response.data;  
    if (respData.success) {
      Toast.show({
        type: 'cSuccess',
        text1: 'Ürün sepetinize eklenmiştir',
        visibilityTime: 1000,
      })
      yield put({ type: ActionTypes.product.ADD_CART_SUCCESS, response: respData.data })
    } else {
      yield put({ type: ActionTypes.product.ADD_CART_ERROR })
    }

  } catch (error) { 
    console.log(error)
    Toast.show({
      type: 'cWarning',
      text1: 'Ürün Sepete eklenemedi',
      visibilityTime: 1000,
    })
    yield put({ type: ActionTypes.product.ADD_CART_ERROR, error })
  }
}


const productSaga = [
  takeLatest(ActionTypes.product.ADD_PRODUCT, handleAddProduct),
  takeLatest(ActionTypes.product.GET_CATEGORIES, handleGetCategories),
  takeLatest(ActionTypes.product.GET_SUB_CATEGORIES, handleGetSubCategories),
  takeLatest(ActionTypes.product.GET_PRODUCTS, handleGetProducts),
  takeLatest(ActionTypes.product.ADD_CART, handleAddCart),
  
]

export default productSaga;