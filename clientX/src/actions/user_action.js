import axios from 'axios';
import {LOGIN_USER,REGISTER_USER,AUTH_USER,LOGOUT_USER,
    ADD_TO_CARD_USER,
    GET_CART_ITEMS_USER, REMOVED_ITEM_CART,
ON_SUCCESS_BUY_USER,UPDATE_DATA_USER,
CLEAR_UPDATE_USER_DATA} from './types'
import {USER_SERVER} from '../components/utilis/misc';


export function loginUser(datatoSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, datatoSubmit)
        .then(res => res.data)
        .catch(e => e.msg)
    return {
        type: LOGIN_USER,
        payload: request
    }
}
export function registerUser(datatoSubmit){
     const request = axios.post('/api/users/register', datatoSubmit)
         .then(res => res.data)
         .catch(e => e.msg)
     return {
         type: REGISTER_USER,
         payload: request
     }
}
export function addToCard(_id) {
    console.log(_id)
    const request = axios.post(`/api/users/addToCart?productId=${_id}`)
    .then(res=>res.data)
    return {
        type: ADD_TO_CARD_USER,
        payload:request

    }
}
export function authUser(){
    // console.log("server hits authUser")
    const request = axios.get(`${USER_SERVER}/auth`, )
         .then(res => {
            //  console.log(res.data)
            return res.data;
            })
         .catch(e => e)
    return {
        type:AUTH_USER,
        payload:request
    }
}
export function logoutUser() {
    
    const request = axios.get('/api/users/logout')
        .then(response => {
            // console.log(response.data)
            return response.data}
            );
        
    return {
        type: LOGOUT_USER,
        payload: request
    }

}
export function getCartItems(cartItems,userCart){
    const request = axios.get(`/api/product/get_product_by_id?id=${cartItems}&type=array`)
        .then(res => {
           userCart.forEach(item => {
               res.data.forEach((k,i)=>{
                   if(item.id===k._id){
                       res.data[i].quantity=item.quantity;                   }
               })
           });
           return res.data;
        })

    
    
    return {
        type:GET_CART_ITEMS_USER,
        payload:request
    }

}
export function removeCartItem(id){
    const request = axios.get(`/app/user/removerFromCart?_id=${id}`)
    .then(res=>{
        res.data.cart.forEach(item=>{
            res.data.cartDetail.forEach((k,i)=>{
                if(item.id===k._id){
                    res.data.cartDetail[i].quantity=item.quantity;
                }
            })
        })
        // console.log(res.data)
        return res.data;
    }).catch(err => console.log("at removeCartItem",err))
    return {
        type:REMOVED_ITEM_CART,
        payload:request
    }
}




export function onSuccessBuyUser(data){
    const request = axios.post('/api/user/successBuy',data)
                        .then(res=>res.data);
                    
    return {
        type: ON_SUCCESS_BUY_USER,
        payload:request
    }
}

export function updateUserData(data){
    const request = axios.post('/api/user/updateProfile',data)
                        .then(res=>res.data)
                        .catch(err=>console.log(err))
    return {
        type: UPDATE_DATA_USER,
        payload:request
    }

}
export function clearUpdateUser(){
    return {
        type:CLEAR_UPDATE_USER_DATA,
        payload:''
    }
}
