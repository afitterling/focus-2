import React from 'react';
import {ItemsList} from '../items/list';
import {NewInput} from '../items/forms/new';
import {EditItemForm} from '../items/forms/edit';

export class Items extends React.Component {
    
    constructor(props){
        super();
        this.state = {showNewForm: false};
        this.onNewItem = this.onNewItem.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onItemAdd = (item) => {
        this.props.onItemAdd(item);
        this.setState({showNewForm: false});
    }

    onNewItem () {
        this.setState({showNewForm: true});
    }

    onCancel () {
        this.setState({showNewForm: false, showEditForm: false, activeItem: null});
    }

    onCellClick = (id) => () => {
        if (id && !this.state.showNewForm) {
            this.setState({showEditForm: true, activeItem: this.props.items.find( i => i.id === id)});
        }
    }

    onUpdate = (item) => {
        const ok = this.props.onUpdateItem(item);
        this.setState({showEditForm: !ok, activeItem: null});
    }

    render(){
        return (
            <div className="ui">
                <ItemsList onCellClick={this.onCellClick} onDelete={this.props.onItemDelete} items={this.props.items}></ItemsList>
                { 
                    this.state.showNewForm ? <NewInput onAddItem={this.onItemAdd} onSubmit={this.onItemAdd} onCancel={this.onCancel}></NewInput> : null
                }
                {
                    this.state.showEditForm ?
                    <EditItemForm item={this.state.activeItem} onUpdateItem={this.onUpdate} onCancel={this.onCancel}></EditItemForm> :
                    null
                }
                {
                    this.state.showNewForm || this.state.showEditForm ? null :
                    <div className="ui" style={{padding: '5px'}}>
                        <button className="ui circular button icon" onClick={this.onNewItem}><i className="circle icon plus"></i></button>
                    </div>                
                }
            </div>
        );
    }
}
