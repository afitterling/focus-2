import React from 'react';
import { Form } from 'semantic-ui-react';

export class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: ''}
    }

    componentDidMount(){
        this.setState({email: JSON.parse(localStorage.getItem('email'))});
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
        localStorage.setItem('email', JSON.stringify(e.target.value));
    }

    render() {
        return (<Form>
            <Form.Field>
                <label>UserId</label>
                <input value={this.props.userId} onChange={()=>{}} disabled={false} />
            </Form.Field>
            <Form.Field>
                <label>E-Mail</label>
                <input value={this.state.email} onChange={this.onEmailChange} disabled={false} />
            </Form.Field>
        </Form>);
    }
}