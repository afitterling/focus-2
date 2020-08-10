import React from 'react';
import { Table, Header, Progress } from 'semantic-ui-react';

export const GenericTable = ({ items, sorterFns, title, onDelete, displayName, onCellClick }) => {

    let sortedItems = [...items];

    sorterFns.reverse().forEach( sortFn => {
        sortedItems = sortedItems.sort(sortFn);
    });

    return (
        <Table unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{title[0]}</Table.HeaderCell>
                    <Table.HeaderCell>{title[1]}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>   
                {sortedItems.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell onClick={onCellClick(item.id)}>
                            <Header as='h4' image style={{width: '100%'}}>                                
                                <Header.Content style={{width: '100%'}}>
                                    {item[displayName[0]]} {item.focus ? <div className="ui blue horizontal label">Focus</div> : null}<br/>
                                    {item.progress > 0 ? <Progress style={{margin: '5px 0', width: '100%'}} percent={item.progress/12*100} size='tiny'></Progress> : null}
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

