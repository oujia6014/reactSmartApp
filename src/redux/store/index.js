// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import reducer from '../reducers/rootReducer';
//
// const store = createStore(
//     combineReducers(reducer),
//     applyMiddleware(sagaMiddleware)
// );
//
// export default store

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk))
    );
}
const store = configureStore();
export default store;