import ActionTypes from "../actionTypes";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
}

export default function (state = initialState, action) {
  let response = action.response;

  switch (action.type) {
    case ActionTypes.auth.LOGIN:
      return { ...state, response, isLoading: true };
    case ActionTypes.auth.LOGIN_SUCCESS:
      return { ...state, user: response, isLoggedIn: true, isLoading: false };
    case ActionTypes.auth.LOGIN_ERROR:
      return { ...state, user: response, isLoggedIn: false, isLoading: false };

    case ActionTypes.auth.REGISTER:
      return { ...state, response, isLoading: true };
    case ActionTypes.auth.REGISTER_SUCCESS:
      return { ...state, user: response, isLoggedIn: false, isLoading: false };
    case ActionTypes.auth.REGISTER_ERROR:
      return { ...state, user: response, isLoggedIn: false, isLoading: false };

    case ActionTypes.auth.LOGOUT:
      return { ...state, user: {}, isLoggedIn: false };
    case ActionTypes.auth.LOGOUT_SUCCESS:
      return { ...state, user: {}, isLoggedIn: false };
    default:
      return state;
  }

}
