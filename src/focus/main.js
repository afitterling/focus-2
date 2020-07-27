import React from 'react'
import { List, Segment } from 'semantic-ui-react'

export const MainList = ({items}) => (
    <Segment inverted>
    <List divided inverted relaxed>
        {items.map(({title, desc}) => (
            <List.Item key={title}>
            <List.Content>
                <List.Header><i className="icon close white"></i> {title}</List.Header>{desc}
            </List.Content>
            </List.Item>
            )
        )}
    </List>
</Segment>
)