import React from 'react';

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
        clearTimeout(this.promise);
        this.promise = setTimeout(() => {
            this.onDebounce(val);
        }, 200)
    }
    
    filter = (val) => {
        return this.props.items.filter(i => this.props.matcher(val, i));
    };

    onDebounce = (val) => {
        this.props.onChange(
            val,
            this.filter(val)
            );
    }

    render = () => {
        return (
            (
                <div className="ui icon input" style={{width: '100%'}}>
                    <input type="text" value={this.state.form.searchString} onChange={this._onChange} placeholder="Search..." />
                    <i onClick={()=>{this.setState({ form:  {searchString: ''}});this.onDebounce('')}} className="circular trash link icon"></i>
                </div>
            )
        );

    }
}