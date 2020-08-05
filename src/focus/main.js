import React from 'react'
import { List, Segment } from 'semantic-ui-react'

export const MainList = ({items, onDelete}) => {
    //const stopEvent = (e) => {e.stopPropagation();}
    return (
        <Segment inverted>
        <List divided inverted relaxed>
            {items.map(({id, title, desc}) => (
                <div className="item" key={id}>
                    <div className="content">
                        <div className="header"><button className="circular icon button ui" onClick={onDelete(id)}><i className="icon trash"></i></button>{title}</div>
                        {desc}                        
                    </div>
                </div>                
                )
            )}
        </List>
    </Segment>
    );
}