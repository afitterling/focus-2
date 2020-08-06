import React from 'react';
import {ItemsList} from '../items/list';
import {NewInput} from '../items/forms/new';

export class Items extends React.Component {
    
    constructor(props){
        super();
        this.state = {showNewForm: false};
        this.onNewItem = this.onNewItem.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onItemAdd = props.onItemAdd;
    }

    onNewItem () {
        this.setState({showNewForm: true});
    }

    onCancel () {
        this.setState({showNewForm: false});
    }

    render(){
        return (
            <div className="ui">
                <ItemsList onDelete={this.props.onItemDelete} items={this.props.items}></ItemsList>
                 { 
                    this.state.showNewForm ? <NewInput onAddItem={this.onItemAdd} onSubmit={this.onItemAdd} onCancel={this.onCancel}></NewInput> : 
                    <div className="ui" style={{padding: '5px'}}>
                        <button className="ui circular button icon" onClick={this.onNewItem}><i className="circle icon plus"></i></button>
                    </div>
                }        
            </div>
        );
    }
}
