import ActionTypes from "../actionTypes";


const addProduct = (data) => {  
    return {
        type : ActionTypes.product.ADD_PRODUCT,
        payload: data,
    }
}

const getProducts = (data) => ({
    type : ActionTypes.product.GET_PRODUCTS,
    payload: data,
})


const getCategories = (data) => ({
    type : ActionTypes.product.GET_CATEGORIES,
    payload: data,
})

const getSubCategories = (data) => ({
    type : ActionTypes.product.GET_SUB_CATEGORIES,
    payload: data,
})
 
const addCart = (data) => ({
    type : ActionTypes.product.ADD_CART,
    payload: data,
})
 

const productActions = {
    addProduct,
    getProducts,
    getCategories,
    getSubCategories,
    addCart
};

export default productActions;