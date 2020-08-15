
import React from 'react';
import { Dimensions as dims} from '../models/dimensions'
import { GenericTable } from '../components/generic-table/table-2';

export const congruentMatcher = (item, filter) => {    
    if (!item.dimensions) return false;
    return !!dims.every(d => {
        return parseInt(item.dimensions[d.id]) >= filter[d.id];
    });
}

export const filterItems = (items, filterCriteria, matcher) => {
    return items.filter(i => i.dimensions).map(i => {
        dims.forEach(d => i.dimensions[d.id] = i.dimensions[d.id] ? i.dimensions[d.id] : 0);
        return i;
    }).filter( i => {
        return matcher(i, filterCriteria);
    });
}

export const Assistant = ({items}) => {
    return (
        <div className="ui">
            <GenericTable sorterFns={[]} onDelete={null} onCellClick={()=>{}} displayName={['title']} title={['Selected', '']} items={items}></GenericTable>
        </div>
    );
}