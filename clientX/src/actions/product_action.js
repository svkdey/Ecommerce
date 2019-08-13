import axios from 'axios';
import {GET_PRODUCT_BY_ARRIVAL,GET_PRODUCT_BY_SELL,
        GET_BRANDS,GET_WOODS,GET_PRODUCT_TO_SHOP,
    ADD_PRODUCT, CLEAR_PRODUCT, POST_BRANDS, POST_WOODS,
    GET_PRODUCT_DETAILS, CLEAR_PRODUCT_DETAILS, 

} from './types'
import { PRODUCT_SERVER } from '../components/utilis/misc';

export function getProductdetails(id){
    const request = axios.get(`/api/product/get_product_by_id?id=${id}&type=single`)
                        .then(res=>{
                            // console.log(res.data)
                        return res.data[0]
                    })
    return {
        type: GET_PRODUCT_DETAILS,
        payload: request
    }
}


export function clearProductdetails() {
    return {
        type: CLEAR_PRODUCT_DETAILS,
        payload: null
    }
}










export function getProductByArrival(){
    const request = axios.get(`/api/product/articles?sortby=arrival&order=desc&limit=4`)
        .then(res => res.data)
    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }
    
}



export function getProductBySell() {
   const request= axios.get(`/api/product/articles?sortby=sold&order=desc&limit=4`)
                        .then(res=>res.data)
    return {
        type: GET_PRODUCT_BY_SELL,
        payload:request
    }
}
export function addProduct(dataTosubmit){
    const request = axios.post('/api/product/article', dataTosubmit)
        .then(res => res.data)

    return {
        type:ADD_PRODUCT,
        payload:request
    }
}


// --------------------------------------------

export function getBrands(){
    const request = axios.get('/api/product/get_brand')
        .then(res => res.data)
    return {
        type: GET_BRANDS,
        payload: request
    }
}; 
export function addBrand(data){
    const request = axios.post('/api/product/brand',data)
        .then(res => res.data)
    return {
        type: POST_BRANDS,
        payload: request
    }
}

export function getWoods(){
    const request = axios.get('/api/product/get_wood')
        .then(res => res.data)
    return {
        type: GET_WOODS,
        payload: request
    }
}
export function addWood(data) {
    const request = axios.post('/api/product/wood', data)
        .then(res => res.data)
    return {
        type: POST_WOODS,
        payload: request
    }
}

export function getProductToShop(skip,limit,filters=[],previosState=[]){
    const data={limit,skip,filters};
    // console.log(data)
    const request = axios.post('/api/product/shop',data)
                        .then(res=>{
                            let newState=[
                                ...previosState,
                                ...res.data.articles
                            ]
                             return {
                                 size: res.data.size,
                                 articles: newState
                             }
                        });
    return {
        type:GET_PRODUCT_TO_SHOP,
        payload:request
    }
}




export function clearProduct(){
    return {
        type:CLEAR_PRODUCT,
        payload:null
    }
}