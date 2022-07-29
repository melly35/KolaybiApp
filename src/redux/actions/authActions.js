import ActionTypes from "../actionTypes";


const loginUserAction = (user) => {  
    return {
        type : ActionTypes.auth.LOGIN,
        payload: user
    }
}

const register = (user) => ({
    type : ActionTypes.auth.REGISTER,
    payload: user,
})


const logout = (user) => ({
    type : ActionTypes.auth.LOGOUT,
    payload: user,
})

const authAction = {
    loginUserAction,
    register,
    logout
};

export default authAction;