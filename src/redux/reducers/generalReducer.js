import ActionTypes from "../actionTypes"; 

const initialState = {
  orders: {},
  orderStatus: false, 
  carts: {},
  cartStatus: false, 
  createOrderStatus: false,
  orderFinally: false,
}

export default function(state = initialState, action) {
    let response = action.response;
  
    switch(action.type) { 
      case ActionTypes.general.GET_ORDERS:
        return { ...state, response, orderStatus: true }; 
      case ActionTypes.general.GET_ORDERS_SUCCESS:
        return { ...state, orders: response, orderStatus: false}; 
      case ActionTypes.general.GET_ORDERS_ERROR:
        return { ...state, orders: {}, orderStatus: false};
        
      case ActionTypes.general.GET_CARTS:
        return { ...state, response, cartStatus: true }; 
      case ActionTypes.general.GET_CARTS_SUCCESS:
        return { ...state, carts: response, cartStatus: false}; 
      case ActionTypes.general.GET_CARTS_ERROR:
        return { ...state, carts: {}, cartStatus: false}; 

      case ActionTypes.general.CREATE_ORDER:
        return { ...state, response, createOrderStatus: true }; 
      case ActionTypes.general.CREATE_ORDER_SUCCESS:
        return { ...state, createOrderStatus: false, orderFinally: true}; 
      case ActionTypes.general.CREATE_ORDER_ERROR:
        return { ...state, createOrderStatus: false}; 
    
      default:
        return state;
    }
  }
 
