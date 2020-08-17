import { createStore, /* applyMiddleware, compose */ } from 'redux';

//import { tubeLight } from './reducers/tubeLight';
import createReducer from './reducers/root';

export default function configureStore(initialState={}, history){
    const store = createStore(
        createReducer(),
    );

    store.injectedReducers = {}
    return store;
};
