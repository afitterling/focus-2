import {
    ITEM_ADD,
    ITEM_RM,
    ITEM_UPDATE
} from '../actionTypes';
import { List } from 'immutable';

let initialState = List();

export default function items(state = initialState, action){
    switch (action.type) {
        case ITEM_ADD:
            return [...state, action.data];
        case ITEM_RM:
            return [...state.filter( i => i.id !== action.id)];
        case ITEM_UPDATE:
            return [...state.map( item => {
                if (action.data.id === item.id) {
                    return action.data;
                }
                return item;
            })];
        default:
            return state;
    }
}
