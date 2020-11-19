import {GET_ERRORS} from '../actions/types';

const initState = {};

export default function(state=initState,actions){
    switch(actions.type){
        case GET_ERRORS:
            return actions.payload;
        default:
            return state;
    }
}