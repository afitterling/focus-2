import React from 'react';
import { GenericTable } from '../components/generic-table/table';
import { ItemForm } from '../components/generic-form/form';
import ModalBasic from '../components/modal';
import moment from 'moment';

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

    sorterNumericDesc = (sortBy) => {
        return (a,b) => {
            const compA = parseInt(a[sortBy]);
            const compB = parseInt(b[sortBy]);
            if (compA > compB) return -1;
            if (compA < compB) return 1;
        }
    }

    ascSorter = (sortBy) => {
        return (a,b) => {
            const compA = a[sortBy];
            const compB = b[sortBy];
            if (compA < compB) return -1;
            if (compA > compB) return 1;
            if (compA === compB) return 0;    
        }
    }
        
    onModeChange({focus}){
        return () => {
            this.setState({focusActive: focus});
        }
    }

    onFocusModeFilter(items){
        if (this.state.focusActive){
            return items.filter(i => i.focus);
        }
        return items;
    }

    onFocusFilterDate(items){
        if (this.state.focusActive){
            return items.filter(i => moment().diff(moment(i.dateRaw), 'days') === 0 || i.focus);
        }
        return items;
    }

    render() {
        return (
            <div className="ui">
                <div class="ui large buttons">
                    <button class="ui button" onClick={this.onModeChange({focus: false})}>All</button>
                    <div class="or"></div>
                    <button class="ui button" onClick={this.onModeChange({focus: true})}>Focus</button>
                </div>
                <GenericTable title={['Scheduled', '']}
                    displayName={['title', 'desc', 'date']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    sorterFns={[this.ascSorter('dateRaw'), this.sorterNumericDesc('progress')]}
                    items={this.onFocusFilterDate(this.props.items.filter(i => {
                        return !!i.date;
                    }))}>
                </GenericTable>
                <GenericTable title={['Pending', '']}
                    displayName={['title', 'desc']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    sorterFns={[this.sorterNumericDesc('progress')]}
                    items={this.onFocusModeFilter(this.props.items.filter(i => !i.dateRaw))}>
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
