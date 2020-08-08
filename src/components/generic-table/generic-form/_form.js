import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

const emptyForm = {title: '', desc: ''};

export class ItemForm extends React.Component {

    constructor(props){
      super(props);
      this.state = this.props.item ? {form: {...this.props.item}} : {form: {...emptyForm}};
    }

    onSubmit = () => {
      const newItem = {id: uuidv4(), ...this.state.form};
      this.props.onAddItem(newItem);
      this.setState({form: {...emptyForm}});        
    }

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: {...form}});
          };    
    }

    render(){
      return (
        <Form onSubmit={this.onSubmit} style={{padding: '0 5px 0 5px'}}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='name' value={this.state.form.title} onChange={this.onChange('title')} />
          </Form.Field>
          <Form.Field disabled={!this.state.form.title}>
            <label>Description</label>
            <input placeholder='description' value={this.state.form.desc} onChange={this.onChange('desc')} />
          </Form.Field>
          <Button type='submit'>Save</Button>
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </Form>
      );
    }
}


