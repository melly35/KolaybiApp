import ActionTypes from "../actionTypes";

 
const getOrders = (data) => ({
    type : ActionTypes.general.GET_ORDERS,
    payload: data,
})
 

const getCarts = (data) => ({
    type : ActionTypes.general.GET_CARTS,
    payload: data,
})

const createOrder = (data) => ({
    type : ActionTypes.general.CREATE_ORDER,
    payload: data,
})

const generalAction = {
    getOrders, 
    getCarts,
    createOrder
};

export default generalAction;