import {LOGIN_USER,REGISTER_USER, AUTH_USER,
    LOGOUT_USER, ADD_TO_CARD_USER,
    GET_CART_ITEMS_USER,
    REMOVED_ITEM_CART, ON_SUCCESS_BUY_USER,
    UPDATE_DATA_USER,
    CLEAR_UPDATE_USER_DATA} from '../actions/types'

export default function(state={},action){
    switch (action.type) {
         case LOGOUT_USER:
            return { ...state, cartDetail:null}
        case AUTH_USER:
            // console.log("atAUTH_USER", action.payload)
            return {...state,userData:action.payload}
        case LOGIN_USER:
            return {...state,loginSuccess:action.payload}
        case REGISTER_USER:
            return {...state,registerSuccess:action.payload}
        case ADD_TO_CARD_USER:
            return { ...state, userData:{
                ...state.userData,
                cart:action.payload
            } }
        case GET_CART_ITEMS_USER:
            return {...state,cartDetail:action.payload}
        case REMOVED_ITEM_CART:
            // console.log(action.payload)
            return {...state,
                cartDetail:action.payload.cartDetail,
                userData:{
                    ...state.userData,
                    cart:action.payload.cart
                }}
        case ON_SUCCESS_BUY_USER:
            // console.log(action.payload)
            return {
                ...state,
                successBuy:action.payload.success,
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetail:action.payload.cartDetail
            }
        case UPDATE_DATA_USER:{
            return {...state,updateUser:action.payload}
        }
        case CLEAR_UPDATE_USER_DATA:{
            return { ...state, updateUser: action.payload}
        }
        default:
            return state;
    }

}