import React from 'react';
import { Form } from 'semantic-ui-react';

export class Settings extends React.Component {
    render() {
        return (<Form>
            <Form.Field>
                <label>UserId</label>
                <input value={this.props.userId} onChange={()=>{}} disabled={false} />
            </Form.Field>
        </Form>);
    }
}