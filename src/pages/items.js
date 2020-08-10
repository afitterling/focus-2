import React from 'react';
import { GenericTable } from '../components/generic-table/table';
import { ItemForm } from '../components/generic-form/form';
import ModalBasic from '../components/modal';

export class Items extends React.Component {

    constructor() {
        super();
        this.state = { showNewForm: false };
        this.onNewItem = this.onNewItem.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onItemAdd = (item) => {
        this.props.onItemAdd(item);
        this.setState({ showNewForm: false });
    }

    onNewItem() {
        this.setState({ showNewForm: true });
    }

    onCancel() {
        this.setState({ showNewForm: false, showEditForm: false, activeItem: null });
    }

    onCellClick = (id) => () => {
        if (id && !this.state.showNewForm) {
            this.setState({ showEditForm: true, activeItem: this.props.items.find(i => i.id === id) });
        }
    }

    onUpdate = (item) => {
        const ok = this.props.onUpdateItem(item);
        this.setState({ showEditForm: !ok, activeItem: null });
    }

    // -> 
    sorter = (sortBy) => {
        return (a,b) => {
            const compA = a[sortBy];
            const compB = b[sortBy];
            if (compA < compB) return -1;
            if (compA > compB) return 1;
            if (compA === compB) return 0;    
        }
    }
        
    render() {
        return (
            <div className="ui">
                <GenericTable title={['Scheduled', '']}
                    displayName={['title', 'desc', 'date']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    sorterFns={[this.sorter('dateRaw')]}
                    items={this.props.items.filter(i => {
                        return !!i.date;
                    })}>
                </GenericTable>

                <GenericTable title={['Pending', '']}
                    displayName={['title', 'desc']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    items={this.props.items.filter(i => !i.dateRaw)}>
                </GenericTable>
                {
                    this.state.showNewForm ?
                        <ModalBasic title='Add Item'>
                            <ItemForm onAddItem={this.onItemAdd} onSubmit={this.onItemAdd} onCancel={this.onCancel}></ItemForm>
                        </ModalBasic> : null
                }

                {
                    this.state.showEditForm ?
                        <ModalBasic title='Edit Item'>
                            <ItemForm item={this.state.activeItem} onUpdateItem={this.onUpdate} onCancel={this.onCancel}></ItemForm>
                        </ModalBasic>
                        :
                        null
                }

                {
                    this.state.showNewForm || this.state.showEditForm ? null :
                        <div className="ui" style={{ padding: '5px' }}>
                            <button className="ui circular button icon" onClick={this.onNewItem}><i className="circle icon plus"></i></button>
                        </div>
                }
            </div>
        );
    }
}
