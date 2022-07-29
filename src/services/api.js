
import axios from 'axios';
import { Platform } from 'react-native'; 

const API_ROOT = Platform.select({
    ios: 'http://127.0.0.1:8000/api/v1/',
    android: 'http://192.168.1.35:8000/api/v1/'
})

//Test ortamında sıkıntı yaratıyor.
//let accesToken =  store.getState().authReducer.isLoggedIn ? store.getState().authReducer.user.accessToken : null
 

function header(token){ 
    return { 
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' }
    };
}

export function errMsgList(errorList){ 
    let errMsg = '';
    Object.values(errorList.response.data.msg).forEach(e => {
        errMsg += e + '\n';
    });
    return errMsg;
}

export function AuthLogin(email, password) {
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    return axios.post(API_ROOT + 'login', formData);
};

export function AuthRegister(name, email, password) {
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name); 

    return axios.post(API_ROOT + 'register', formData);
};

export function AddProduct(productBarcode, productName, productPrice, mainCategoryId, subCategoryId, productDesc, accessToken) { 
    var formData = new FormData();
    formData.append("productBarcode", productBarcode);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("mainCategoryId", mainCategoryId);
    formData.append("subCategoryId", subCategoryId);
    formData.append("productDesc", productDesc);  

    return axios.post(API_ROOT + 'addProduct', formData, header(accessToken) )
};


export function GetCategories(accessToken) { 
    return axios.get(API_ROOT + 'getCategories', header(accessToken));
};

export function GetSubCategories(accessToken) { 
    return axios.get(API_ROOT + 'getSubCategories', header(accessToken));
};

export function GetOrders(accessToken) { 
    return axios.get(API_ROOT + 'getOrders', header(accessToken));
};

export function GetCarts(accessToken) { 
    return axios.get(API_ROOT + 'getCart', header(accessToken));
};

export function CreateOrder(orderCustomerName, orderCustomerAddress, accessToken) { 
    var formData = new FormData();
    formData.append("customerName", orderCustomerName);
    formData.append("customerAddress", orderCustomerAddress);

    return axios.post(API_ROOT + 'createOrder', formData, header(accessToken) )
};

export function GetProducts(query, price, category, accessToken) { 
    var formData = new FormData();  

    query != null ? formData.append("q", query) : null
    price != null ? formData.append("prc", price) : null
    category != null ? formData.append("cat", category) : null
    

    return axios.post(API_ROOT + 'products', formData, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' }} )
};



export function AddCart(productId, count, accessToken) { 
    var formData = new FormData();
    formData.append("productId", productId);
    formData.append("count", count);

    return axios.post(API_ROOT + 'addCart', formData, header(accessToken) )
};
