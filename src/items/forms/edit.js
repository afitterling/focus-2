import React from 'react';
import { Button, Form } from 'semantic-ui-react';
//import { v4 as uuidv4 } from 'uuid';

//const dimensions = {leisure: 0, career: 0, reconsilation: 0, health: 0, family: 0, sustain: 0};
//const emptyForm = {title: '', desc: '', ...dimensions};

export class EditItemForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {form: {...this.props.item}};
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      //this.onAddItem = props.onAddItem.bind(this);
      this.onCancel = props.onCancel;
    }

    onSubmit = () => {
      const updateItem = {...this.state.form};
      this.props.onUpdateItem(updateItem);
      //this.setState({form: {...emptyForm}});        
    }

    componentDidUpdate({item}){
      if (item !== this.props.item){
        this.setState({form: {...this.props.item}});
      }
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
        <Form onSubmit={this.onSubmit} style={{padding: '0 50px 0 50px'}}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='name' value={this.state.form.title} onChange={this.onChange('title')} />
          </Form.Field>
          <Form.Field disabled={!this.state.form.title}>
            <label>Description</label>
            <input placeholder='description' value={this.state.form.desc} onChange={this.onChange('desc')} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </Form>
      );
    }
}


