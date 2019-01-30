import { FETCH_USER, ID_TOKEN, GET_CATEGORIES, SHOW_BOOKING, SHOW_BOOKING_BUTTON, GET_ISSUES, SHOW_GOOGLE_AUTOCOMPLETE, GET_CURRENT_LOCATION, SAVE_LOCATION } from './types';
import { BASE_URL } from '../config/api';

export const fetchUserData = (userId, token) => dispatch => {
    fetch(`${BASE_URL}/v1/users/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-user-token': token
        }
    })
    .then((res)=> res.json())
    .then((responseJson)=>{
        console.log(responseJson)
        if (responseJson.status==="success"){
            dispatch({
                type: FETCH_USER,
                payload: responseJson.data
            })
        }
    })
    .catch((err)=>console.log(err));
}

export const saveIdToken = (idToken) => dispatch => {
    return dispatch({
        type: ID_TOKEN,
        payload: idToken
    })
}

export const getCategories = (token) => dispatch => {
    fetch(`${BASE_URL}/v1/pro-categories`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-user-token': token
        }
    })
    .then((res)=> res.json())
    .then((responseJson)=>{
        if (responseJson.status==="success"){
            dispatch({
                type: GET_CATEGORIES,
                payload: responseJson.data
            })
        }
    })
    .catch((err)=>console.log(err));
}

export const showBookingFunc = (string) => dispatch => {
    return dispatch({
        type: SHOW_BOOKING,
        payload: string
    })
}

export const showBookingButton = (boolean) => dispatch => {
    return dispatch({
        type: SHOW_BOOKING_BUTTON,
        payload: boolean
    })
}

export const getIssues = (id, token) => dispatch => {
    fetch(`${BASE_URL}/v1/issues/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-user-token': token
        }
    })
    .then((res)=> res.json())
    .then((responseJson)=>{
        if (responseJson.status==="success"){
            dispatch({
                type: GET_ISSUES,
                payload: responseJson.data
            })
        }
    })
    .catch((err)=>console.log(err));
}

export const showGoogleAutoComplete = (boolean) => dispatch => {
    return dispatch({
        type: SHOW_GOOGLE_AUTOCOMPLETE,
        payload: boolean
    })
}

export const currentLocation = (object) => dispatch => {
    // hit reverse geocoding endpoint
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${object.latitude},${object.longitude}
    &key=AIzaSyCiGG3C1Ghzh_vYAnoy9-LK_fhcBDwOifo`, {
        method: 'GET'
    })
    .then((res)=> res.json())
    .then((responseJson)=>{
        let neighborhood = responseJson.results[0].address_components.filter((val)=>val.types[0] === "neighborhood");
        let admin2 = responseJson.results[0].address_components.filter((val)=>val.types[0] === "administrative_area_level_2");
        let obj = {
            latitude: object.latitude,
            longitude: object.longitude,
            address: responseJson.results[0].formatted_address,
            neighborhood: neighborhood[0].long_name,
            admin2: admin2[0].long_name
        }
        dispatch({
            type: GET_CURRENT_LOCATION,
            payload: obj
        })
    })
    .catch((err)=>console.log(err));
}

export const saveLocationFromAsync = (address) => dispatch => {
    return dispatch({
        type: SAVE_LOCATION,
        payload: address
    })
}

