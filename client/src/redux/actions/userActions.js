import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    GET_ERRORS,
    GET_API_MESSAGE,
    SET_CURRENT_USER,
    SET_USERREVIEW_DATA
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { getCurrentAuthenticated} from './authActions';

export const getUserById = (userID) => async dispatch => {
    await axios.get('/api/users/'+userID)
    .then(res=>{
        console.log(res.data);
    })
};

export const updateUser = (userData) => async dispatch => {
    const userID = await (jwt_decode(localStorage.jwtToken)).id;
    await axios.patch('/api/users/' + userID, userData)
    .then(res => {
        dispatch({
            type: GET_API_MESSAGE,
            payload: res.data
        });
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt_decode(token)));
        getCurrentAuthenticated();
    })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            };
        });
    
}

export const updatePassword = (userData) => async dispatch => {

    await axios.patch('/api/users/changePassword/',userData)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err);
    });

}


export const getUserReview = (userID, page) => async dispatch => {
    axios.get('/api/userReview/' + userID + '/?page=' + page)
        .then(res => {
            dispatch({
                type: SET_USERREVIEW_DATA,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const setCurrentUser = decoded => {
    
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
