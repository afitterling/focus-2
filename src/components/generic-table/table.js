import React from 'react';
import { Table, Header } from 'semantic-ui-react';

export const GenericTable = ({ items, title, onDelete, displayName, onCellClick }) => {
    return (
        <Table unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{title[0]}</Table.HeaderCell>
                    <Table.HeaderCell>{title[1]}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell onClick={onCellClick(item.id)}>
                            <Header as='h4' image>                                
                                <Header.Content>
                                    {item[displayName[0]]}
                                    <Header.Subheader>{item[displayName[1]]}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><button className="circular icon button ui" onClick={onDelete(item.id)}><i className="icon trash"></i></button></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

