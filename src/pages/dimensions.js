
import React from 'react';
import { Dimensions as dims} from '../models/dimensions'
import { GenericTable } from '../components/generic-table/table-2';

export const Dimensions = () => {
    return (
        <GenericTable sorterFns={[]} onDelete={null} onCellClick={()=>{}} displayName={['name']} title={['Dimensions', '']} items={dims}></GenericTable>
    );
}