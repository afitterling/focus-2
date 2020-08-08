import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export class EditItemForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {form: {...this.props.item}};
    }

    onSubmit = () => {
      const updateItem = {...this.state.form};
      this.props.onUpdateItem(updateItem);
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


