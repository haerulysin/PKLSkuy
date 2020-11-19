import{
    SET_CURRENT_USER,
    TEMP_DATA_REGISTER,
    USER_LOADING,
    CURRENT_USER_DATA
} from '../actions/types';

const isEmpty = require('is-empty');

const initState = {
    isAuthenticated: false,
    user : {},
    loading: false,
    userRegisterData: {},
    userCurrentData: {}
};


export default function(state = initState, actions){
   switch(actions.type){
       case SET_CURRENT_USER:
           return {
               ...state,
               isAuthenticated: !isEmpty(actions.payload),
               user: actions.payload
           };

        case USER_LOADING:
            return{
                ...state,
                
            };
        case TEMP_DATA_REGISTER:
            return{
                ...state,
                userRegisterData: actions.payload
            };
       case CURRENT_USER_DATA:
           return{
               ...state,
               userCurrentData: actions.payload
           }
        default:   
            return state;
   } 
}