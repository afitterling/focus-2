import React from 'react';
//import _ from 'lodash';

export class AutoComplete extends React.Component {

    constructor(props){
        super(props);
        this.state = { form:  {searchString: ''}};
        this.promise = null;      
        this.onDebounce('');
    }

    _onChange = (e) => {
        const val = e.target.value;
        this.setState({ form: {searchString: val}});
        console.log(val);
        clearTimeout(this.promise);
        this.promise = setTimeout(() => {
            this.onDebounce(val);
        }, 200)
        //_.debounce(this.onDebounce, 2000);
    }
    
    filter = (val) => {
        return this.props.items.filter(i => new RegExp(val).test(i.title));
    };

    onDebounce = (val) => {
        console.log('debounced');
        this.props.onChange(
            val,
            this.filter(val)
            );
    }

    //    const _debouncedOnChange = (e) => {
    //    };

    render = () => {
        return (
            (
                <div className="ui icon input container">
                    <input type="text" value={this.state.form.searchString} onChange={this._onChange} placeholder="Search..." />
                    <i onClick={()=>{this.setState({ form:  {searchString: ''}});this.onDebounce('')}} className="circular trash link icon"></i>
                </div>
            )
        );

    }
}