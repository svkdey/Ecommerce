import axios from 'axios';
import {
    GET_SITE_DATA,
    UPDATE_SITE_DATA
} from './types';



export function getSiteData() {

    const request = axios.get('/api/site/sitedata')
        .then(response => response.data);
   
    return {
        type: GET_SITE_DATA,
        payload: request
    }

}

export function updateSiteData(dataToSubmit) {

    const request = axios.post('/api/site/sitedata', dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_SITE_DATA,
        payload: request
    }

}
