import React from 'react';
import {connect} from 'react-redux';
import {GenericTable} from '../components/generic-table/table';

class Assistant20 extends React.Component {
    constructor(props){
        super(props);
        console.log('Assistant20', props);
        this.state = {
                        itemsRedux: props.itemsRedux,
                        priority: props.itemsRedux.filter(i => i.dimensions && i.dimensions.priority)
                     }
        console.log(this.state);
    }

    render(){
        return (
                <div className="ui">
                    <GenericTable title={['Items', '']}
                        displayName={['title', 'desc', 'date']}
                        onCellClick={()=>{}}
                        onDelete={()=>{
                            this.props.dispatch({type: 'XYZ'});
                        }}
                        sorterFns={[]}
                        items={this.state.itemsRedux}>
                    </GenericTable>
                </div>
        );
    }
}

const mapStateToProps = state => ({ itemsRedux: state.itemsRedux, userId: state.userId });

export default connect(mapStateToProps,)(Assistant20);
