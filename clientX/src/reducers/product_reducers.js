import { GET_PRODUCT_BY_ARRIVAL, GET_PRODUCT_BY_SELL,
    GET_BRANDS, GET_WOODS, GET_PRODUCT_TO_SHOP,
    ADD_PRODUCT, CLEAR_PRODUCT, POST_BRANDS, POST_WOODS,
    GET_PRODUCT_DETAILS, CLEAR_PRODUCT_DETAILS} from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCT_BY_ARRIVAL:
            return {...state,byArrival:action.payload}
        case GET_PRODUCT_BY_SELL:
            return { ...state,bySell:action.payload}
        case GET_BRANDS:
            return { ...state, brands: action.payload }
        case GET_WOODS:
            return { ...state, woods: action.payload }
        case GET_PRODUCT_TO_SHOP:
            // console.log(action.payload)
            return { ...state, 
                toShop: action.payload.articles, 
                toShopSize: action.payload.size
                }
        case ADD_PRODUCT:
            return {...state,addProduct:action.payload}
        case CLEAR_PRODUCT:
            return { ...state, addProduct: action.payload}
        case POST_BRANDS:
            return {...state,addBrand:action.payload}
        case POST_WOODS:
            return { ...state, addWood: action.payload }
        case GET_PRODUCT_DETAILS:
            return { ...state, prodDetail: action.payload }
        case CLEAR_PRODUCT_DETAILS:
            return { ...state, prodDetail: action.payload }
       
        default:
            return state;
    }

}