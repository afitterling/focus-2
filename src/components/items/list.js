import React from 'react';
import { GenericTable } from '../generic-table/table';

export const ItemsList = ({ items, onDelete, onCellClick }) => {
    return (
        <GenericTable title={['Title', '']}
                      displayName={['title', 'desc']}
                      onCellClick={onCellClick}
                      onDelete={onDelete}
                      items={items}>
        </GenericTable>
        );
}

