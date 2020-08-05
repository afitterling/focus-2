import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { RatingControlled } from '../rating';

const dimensions = {leisure: 0, career: 0, reconsilation: 0, health: 0, family: 0, sustain: 0};
const emptyForm = {title: '', desc: '', ...dimensions};

export class NewInput extends React.Component {

    constructor(props){
      super(props);
      this.onAdd = props.onAdd;
      this.state = {form: {...emptyForm, ...dimensions}};
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onSubmit = () => {
      const newItem = {id: uuidv4(), ...this.state.form};
      this.onAdd(newItem);
      this.setState({form: {...emptyForm}});        
    }

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: {...form}});
          };    
    }

    onDimensionChange = (dim) => (val) => {
      const form = {...this.state.form};
      form[dim] = val;
      this.setState({form: {...form}});
    }

    render(){
      return (
        <Form onSubmit={this.onSubmit} style={{padding: '0 50px 0 50px'}}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='name' value={this.state.form.title} onChange={this.onChange('title')} />
          </Form.Field>
          <Form.Field disabled={!this.state.form.title}>
            <label>Description</label>
            <input placeholder='description' value={this.state.form.desc} onChange={this.onChange('desc')} />
          </Form.Field>
          <RatingControlled onValueChange={this.onDimensionChange('leisure')} label={'Leisure'}></RatingControlled>
          <RatingControlled onValueChange={this.onDimensionChange('career')} label={'Job/Career'}></RatingControlled>
          <RatingControlled onValueChange={this.onDimensionChange('reconsilation')} label={'Life/Freedom'}></RatingControlled>
          <RatingControlled onValueChange={this.onDimensionChange('health')} label={'Health'}></RatingControlled>
          <RatingControlled onValueChange={this.onDimensionChange('family')} label={'Family'}></RatingControlled>
          <RatingControlled onValueChange={this.onDimensionChange('sustain')} label={'Sustainability'}></RatingControlled>
          <Button type='submit'>Submit</Button>
        </Form>
      );
    }
}


