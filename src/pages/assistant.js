
import React from 'react';
import { Dimensions as dims} from '../models/dimensions'
import { GenericTable } from '../components/generic-table/table-2';
import { RadarChart as Radar } from '../components/graphs/radar';

export const Assistant = ({items}) => {
    const values = items.map(i => {
        return {
            key: i.id,
            label: i.title,
            values: i.dimensions
        }
    });
    return (
        <div className="ui">
            <GenericTable sorterFns={[]} onDelete={null} onCellClick={()=>{}} displayName={['title']} title={['Selected', '']} items={items}></GenericTable>
            <Radar variables={dims.map( i => {
                return {key: i.id, label: i.name};
            }) } values={values}></Radar>
        </div>
    );
}