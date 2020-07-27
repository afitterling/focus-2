import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const emptyForm = {title: '', desc: ''};

export class NewInput extends React.Component {

    constructor(props){
      super(props);
      this.onAdd = props.onAdd;
      this.state = {form: {...emptyForm}};

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onSubmit = () => {
        console.log(this.state.form);
        this.onAdd(this.state.form);
        this.setState({form: {...emptyForm}});
    }

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: form});
          };    
    }

    render(){
      return (
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='name' value={this.state.form.title} onChange={this.onChange('title')} />
          </Form.Field>
          <Form.Field disabled={!this.state.form.title}>
            <label>Description</label>
            <input placeholder='description' value={this.state.form.desc} onChange={this.onChange('desc')} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      );
    }
}


