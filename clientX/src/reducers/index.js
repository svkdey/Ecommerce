import {combineReducers} from 'redux';
import user from './user_reducer';
import site from './site_reducers'
import products from './product_reducers'
const rootReducer=combineReducers({
    products,
    user,site
})

export default rootReducer;