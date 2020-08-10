import React from 'react';
import { Table, Header } from 'semantic-ui-react';

export const GenericTable = ({ items, sorterFns, title, onDelete, displayName, onCellClick }) => {

    let sortedItems = [...items];

    return (
        <Table unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{title[0]}</Table.HeaderCell>
                    <Table.HeaderCell>{title[1]}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>                
                {sorterFns ? sorterFns.map( sortFn => sortedItems = [...sortedItems].sort(sortFn).map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell onClick={onCellClick(item.id)}>
                            <Header as='h4' image>                                
                                <Header.Content>
                                    {item[displayName[0]]} {item.focus ? <div class="ui blue horizontal label">Focus</div> : null}
                                    <Header.Subheader>
                                        {item[displayName[1]]}<br/>
                                        <em>{item[displayName[2]]}</em>
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><button className="circular icon button ui" onClick={onDelete(item.id)}><i className="icon trash"></i></button></Table.Cell>
                    </Table.Row>
                ))) : items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell onClick={onCellClick(item.id)}>
                            <Header as='h4' image>                                
                                <Header.Content>
                                    {item[displayName[0]]} {item.focus ? <div class="ui blue horizontal label">Focus</div> : null}
                                    <Header.Subheader>
                                        {item[displayName[1]]}<br/>
                                        <em>{item[displayName[2]]}</em>
                                    </Header.Subheader>
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

