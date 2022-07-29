import ActionTypes from "../actionTypes"; 

const initialState = {
  isLoading: false,
  addProductStatus: false,
  getCategoriesStatus: false,
  getSubCategoriesStatus: false,
  categories: [],
  products: []
}

export default function(state = initialState, action) {
    let response = action.response;
  
    switch(action.type) { 
      case ActionTypes.product.ADD_PRODUCT:
        return { ...state, response, isLoading: true }; 
      case ActionTypes.product.ADD_PRODUCT_SUCCESS:
        return { ...state, isLoading: false, addProductStatus: true }; 
      case ActionTypes.product.ADD_PRODUCT_ERROR:
        return { ...state, isLoading: false };

      case ActionTypes.product.GET_CATEGORIES:
        return { ...state, response, isLoading: true }; 
      case ActionTypes.product.GET_CATEGORIES_SUCCESS:
        return { ...state, isLoading: false, categories: response, getCategoriesStatus: true }; 
      case ActionTypes.product.GET_CATEGORIES_ERROR:
        return { ...state, isLoading: false };
        
      case ActionTypes.product.GET_SUB_CATEGORIES:
        return { ...state, response, isLoading: true }; 
      case ActionTypes.product.GET_SUB_CATEGORIES_SUCCESS:
        return { ...state, isLoading: false, subCategories: response, getSubCategoriesStatus: true }; 
      case ActionTypes.product.GET_SUB_CATEGORIES_ERROR:
        return { ...state, isLoading: false };
        
      case ActionTypes.product.GET_PRODUCTS:
        return { ...state, response, isLoading: true }; 
      case ActionTypes.product.GET_PRODUCTS_SUCCESS:
        return { ...state, products: response, isLoading: false }; 
      case ActionTypes.product.GET_PRODUCTS_ERROR:
        return { ...state, products: [], isLoading: false }; 

      case ActionTypes.product.ADD_CART:
        return { ...state, response, isLoading: true }; 
      case ActionTypes.product.ADD_CART_SUCCESS:
        return { ...state, isLoading: false }; 
      case ActionTypes.product.ADD_CART_ERROR:
        return { ...state, isLoading: false }; 

        
        
        
      default:
        return state;
    }
  }
 
