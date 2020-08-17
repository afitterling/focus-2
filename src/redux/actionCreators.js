import { ITEM_ADD } from './actionTypes';

export function addItem(item){
    const action = { ITEM_ADD, data: item};
    console.log(action);
    return action;
}
