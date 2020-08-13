
import React from 'react';
import { Dimensions as dims} from '../models/dimensions'
import { GenericTable } from '../components/generic-table/table-2';
import { RadarChart as Radar } from '../components/graphs/radar';

const congruent = (item, filter) => {    
    if (!item.dimensions) return false;
    return !!dims.some(d => {
        return parseInt(item.dimensions[d.id]) <= filter[d.id];
    });
}

export const Assistant = ({items, filter}) => {
    const filteredItems = items.filter( i => {
        return congruent(i, filter);
    });
    const values = filteredItems.map(i => {
        return {
            key: i.id,
            label: i.title,
            values: i.dimensions
        }
    });
    return (
        <div className="ui">
            <GenericTable sorterFns={[]} onDelete={null} onCellClick={()=>{}} displayName={['title']} title={['Selected', '']} items={filteredItems}></GenericTable>
            <Radar variables={dims.map( i => {
                return {key: i.id, label: i.name};
            }) } values={values}></Radar>
        </div>
    );
}