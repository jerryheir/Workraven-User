import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../Reducers";

const initialState = {};

const middleWare = [thunk];

const middlewareDev = [
    applyMiddleware(...middleWare),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
  ]


export const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        ...middlewareDev
    )
);