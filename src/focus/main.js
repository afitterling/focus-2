import React from 'react'
import { List, Segment } from 'semantic-ui-react'

export const MainList = ({items, onDelete}) => {
    //const stopEvent = (e) => {e.stopPropagation();}
    return (
        <Segment inverted>
        <List divided inverted relaxed>
            {items.map(({id, title, desc}) => (
                <div class="item" key={id}>
                    <div class="content">
                        <div class="header"><button className="button ui" onClick={onDelete(id)}><i className="icon close"></i></button>{title}</div>
                        {desc}                        
                    </div>
                </div>                
                )
            )}
        </List>
    </Segment>
    );
}