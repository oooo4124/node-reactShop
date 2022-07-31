import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; //action.payload는 백엔드 서버에서 가져온 정보
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    case LOGOUT_USER:
      return { ...state };
      break;
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
      break;
    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload };
      break;
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.productInfo,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
      break;
    case ON_SUCCESS_BUY:
      return { ...state , cartDetail: action.payload.cartDetail,
      userData:{
        ...state.userData, cart: action.payload.cart
      }};
      break;
    default:
      return state;
  }
}
