import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

const emptyForm = {title: '', desc: ''};

export class ItemForm extends React.Component {

    constructor(props){
      super(props);
      this.state = this.props.item ? {form: {...this.props.item}} : {form: {...emptyForm}};
    }

    onSave = () => {
      if (this.props.onAddItem) {
        const newItem = {id: uuidv4(), ...this.state.form};
        this.props.onAddItem(newItem);
      }
      if (this.props.onUpdateItem) {
        const updateItem = {...this.state.form};
        this.props.onUpdateItem(updateItem);
        }
    }

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: {...form}});
          };    
    }

    componentDidUpdate({item}){
      if (item !== this.props.item){
        this.setState({form: {...this.props.item}});
      }
    }

    render(){
      return (
        <Form onSubmit={this.onSave} style={{padding: '0 5px 0 5px'}}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='name' value={this.state.form.title} onChange={this.onChange('title')} />
          </Form.Field>
          <Form.Field disabled={!this.state.form.title}>
            <label>Description</label>
            <input placeholder='description' value={this.state.form.desc} onChange={this.onChange('desc')} />
          </Form.Field>
          <Button type="button" className="button" onClick={this.props.onCancel}>Cancel</Button>
          <Button type="submit" 
            content="save"
            labelPosition='right'
            icon='checkmark'
            positive
          />
        </Form>
      );
    }
}


