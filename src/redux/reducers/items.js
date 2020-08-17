import { ITEM_ADD } from '../actionTypes';
import { List } from 'immutable';

let initialState = List();

export default function items(state = initialState, action){
    switch (action.type) {
        case ITEM_ADD:
            console.log(action);
            return [...state, action.data];
        default:
            return state;
    }
}
