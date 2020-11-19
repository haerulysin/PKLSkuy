import {
    GET_API_MESSAGE,
    SET_USERREVIEW_DATA
} from '../actions/types';

const initState = {
    status:0,
    message: '',
    userReviewData: [],
};


export default function (state = initState, actions) {
    switch (actions.type) {
        case GET_API_MESSAGE:
            return {
                ...state,
                status: actions.payload.status,
                message: actions.payload.message
            };

        case SET_USERREVIEW_DATA:
            return{
                ...state,
                userReviewData: actions.payload
            }
        default:
            return state;
    }
}