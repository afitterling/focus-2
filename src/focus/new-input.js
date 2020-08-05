import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { RatingControlled } from '../rating';

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
        this.onAdd({id: uuidv4(), ...this.state.form});
        this.setState({form: {...emptyForm}});        
    }

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: form});
          };    
    }

    onDimensionChange = (dim) => (val) => {
      console.log(dim, val);
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
          <RatingControlled onValueChange={this.onDimensionChange('leisure')} label={'Leisure'}></RatingControlled>
          <RatingControlled label={'Job/Career'}></RatingControlled>
          <RatingControlled label={'Health'}></RatingControlled>
          <RatingControlled label={'Reconsilation'}></RatingControlled>
          <Button type='submit'>Submit</Button>
        </Form>
      );
    }
}


