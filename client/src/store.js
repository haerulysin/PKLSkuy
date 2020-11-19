import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import MainReducer from './redux/reducers';

const initialState = {};
const middleware = [thunk];


const store = createStore(
    MainReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;