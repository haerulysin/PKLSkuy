import {
    REQUESTPROJECT_LOADING,
    SET_PROJECT_DATA,
    SET_PROJECTBY_DATA,
    SET_PROPOSALIST_DATA
} from '../actions/types';

const initState = {
    isLoading: false,
    projectData: {},
    projectUserData : {},
    proposalListData: [],
};


export default function (state = initState, actions) {
    switch (actions.type) {
        case REQUESTPROJECT_LOADING:
            return {
                ...state,
                isLoading: actions.payload
            };
        case SET_PROJECT_DATA:
            return {
                ...state,
                projectData: actions.payload
            };
        case SET_PROJECTBY_DATA:
            return{
                ...state,
                projectUserData: actions.payload
            }
        
        case SET_PROPOSALIST_DATA:
            return{
                ...state,
                proposalListData: actions.payload

            }


        default:
            return state;
    }
}