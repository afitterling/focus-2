import React from 'react';
import { GenericTable } from '../components/generic-table/table';
import { ItemForm } from '../components/generic-form/form';
import ModalBasic from '../components/modal';
import moment from 'moment';
import { Dimensions as dims} from '../models/dimensions'

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
        const newItem = {title: '', desc: '', date: '', focus: this.props.focusActive, agenda: false, inProgress: false, progress: 0, dimensions: {}};
        // TODO replace failsafe
        dims.forEach( v => {
            newItem.dimensions[v.id] = 0;
        });          
        this.setState({ showNewForm: true, activeItem: {
            ...newItem
        } });
    }

    onCancel() {
        this.setState({ showNewForm: false, showEditForm: false});
    }

    // this helper function takes care of old items stored in data source if no dimensions where defined
    failSafeDimensions = (item) => {
        const enhanced = Object.assign({dimensions: {}}, item);
        dims.forEach( ({id}) => {
            enhanced.dimensions[id] = enhanced.dimensions[id] ? enhanced.dimensions[id] : 0;
        })
        return enhanced;
    }

    onCellClick = (id) => () => {
        if (id && !this.state.showNewForm) {
            this.setState({ showEditForm: true, activeItem: this.failSafeDimensions(this.props.items.find(i => i.id === id)) });
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
            console.log(compA, compB);
            if (compA > compB) return -1;
            if (compA < compB) return 1;
        }
    }

    sorterDimensionsDesc = (sortBy) => {
        return (a,b) => {
            const compA = parseInt(a.dimensions[sortBy]);
            const compB = parseInt(b.dimensions[sortBy]);
            console.log(compA, compB);
            if (!compA && !compB) return 1;
            if (compA > compB) return -1;
            if (compA && !compB) return -1;
            if (compA < compB) return 1;
            if (!compA && compB) return 1;
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
        if (this.props.focusActive){
            return items.filter(i => i.focus);
        }
        return items;
    }

    onFocusFilterDate(items){
        return items.filter(i => moment(i.dateRaw).diff(moment(), 'hours') < 6);
    }

    noDoing = (items) => items.filter(i => !i.inProgress)

    render() {
        return (
            <div className="ui">
                { this.props.focusActive ? 
                    <GenericTable title={['Doing', '']}
                        displayName={['title', 'desc', 'date']}
                        onCellClick={this.onCellClick}
                        onDelete={this.props.onItemDelete}
                        sorterFns={[this.ascSorter('dateRaw'), this.sorterNumericDesc('progress')]}
                        items={this.props.items.filter(i => i.inProgress)}>
                    </GenericTable> : null
                }

                <GenericTable title={['Scheduled', '']}
                    displayName={['title', 'desc', 'date']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    sorterFns={[this.ascSorter('dateRaw'), this.sorterNumericDesc('progress')]}
                    items={this.props.focusActive ? this.noDoing(this.onFocusFilterDate(this.props.items.filter(i => i.dateRaw))) : this.props.items.filter(i => i.dateRaw)}>
                </GenericTable>
                
                <GenericTable title={['Priorized', '']}
                    displayName={['title', 'desc']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    sorterFns={[this.sorterDimensionsDesc('priority')]}
                    count={3}
                    items={this.props.focusActive ? this.props.items.filter(i => i.focus && i.dimensions && !!i.dimensions.priority) : this.props.items.filter(i => i.dimensions && !!i.dimensions.priority)}>
                </GenericTable>

                <GenericTable title={['Pending', '']}
                    displayName={['title', 'desc']}
                    onCellClick={this.onCellClick}
                    onDelete={this.props.onItemDelete}
                    sorterFns={[/* this.sorterDimensionsDesc('priority'),*/ this.sorterNumericDesc('progress')]}
                    items={this.props.focusActive ? this.noDoing(this.props.items.filter(i => !i.dateRaw && i.focus)) : this.props.items.filter(i => !i.dateRaw)}>
                </GenericTable>
                {
                    this.state.showNewForm ?
                        <ModalBasic title='Add Item'>
                            <ItemForm item={this.state.activeItem} onAddItem={this.onItemAdd} onSubmit={this.onItemAdd} onCancel={this.onCancel}></ItemForm>
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
