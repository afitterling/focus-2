import React from 'react'
import { List, Segment } from 'semantic-ui-react'

export const MainList = ({items, onDelete}) => (
    <Segment inverted>
    <List divided inverted relaxed>
        {items.map(({id, title, desc}) => (
            <List.Item key={id}>
            <List.Content>
                <List.Header onClick={onDelete(id)}><i className="icon close white"></i> {title}</List.Header>{desc}
            </List.Content>
            </List.Item>
            )
        )}
    </List>
</Segment>
)