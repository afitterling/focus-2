import { createStore, /* applyMiddleware, compose */ } from 'redux';
import { fromJS } from 'immutable';
import items from './reducers/items';

//import { tubeLight } from './reducers/tubeLight';
import createReducer from './reducers/root';

/*
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )*/
export default function configureStore(initialState={}, history){
    const store = createStore(
        createReducer({
            items,
        }),
        fromJS(initialState),
        //composedEnhancers
    );

    store.injectedReducers = {}
    return store;
};
