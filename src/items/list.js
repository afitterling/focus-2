import React from 'react'
import { Table, Header } from 'semantic-ui-react'

export const ItemsList = ({ items, onDelete }) => {
    return (
        <Table unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Items</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map(({title, id, desc}) => (
                    <Table.Row key={id}>
                        <Table.Cell>
                            <Header as='h4' image>                                
                                <Header.Content>
                                    {title}
                                    <Header.Subheader>{desc}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><button className="circular icon button ui" onClick={onDelete(id)}><i className="icon trash"></i></button></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}
