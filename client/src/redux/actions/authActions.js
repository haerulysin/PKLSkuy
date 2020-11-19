import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    TEMP_DATA_REGISTER,
    CURRENT_USER_DATA
} from './types';

export const checkAvailableEmail = (userData, history = null) => dispatch => {
    axios.post("/api/users/checkAvailableEmail", userData)
        .then(res => {
            dispatch({
                type: TEMP_DATA_REGISTER,
                payload: userData,
            });
            if (history !== null) {
                history.push('/register/step2');
            }

            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            };
        });
};

export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(res => history.push("/"))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const getCurrentAuthenticated = () => dispatch => {
    axios.put("/api/users/currentAuthenticated")
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            dispatch(setCurrentUser(jwt_decode(token)));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
}

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });


};

export const getCurrentUser = () => dispatch => {
    const userID = (jwt_decode(localStorage.jwtToken)).id;
    axios.post('/api/users/currentUser/id/' + userID, { jwtToken: localStorage.jwtToken })
        .then(res => {
            dispatch({
                type: CURRENT_USER_DATA,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            };
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};