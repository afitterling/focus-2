import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';
import moment from 'moment';

const emptyForm = {title: '', desc: '', date: ''};

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

    findAValidPattern = (value) => {
      if (moment(value, "ddd").isValid()) return moment(value, "ddd");

      if (moment(value, "D.MM.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.MM.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");

      if (moment(value, "D.M.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.M.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");

      if (moment(value, "D.M").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.M").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.MM").isValid()) return moment(value, "ddd, DD.MM.YYYY");

      if (moment(value, "D. MMM").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD. MMM").isValid()) return moment(value, "ddd, DD.MM.YYYY");
    }

    onDateProcess = debounce((value) => {
      if (!value) return;
      const date = this.findAValidPattern(value);
      if (date.isValid()) this.setState({form: {...this.state.form, date: date.format('ddd, DD.MM.YYYY'), dateRaw: moment(date, 'ddd DD.MM.YYYY').format()}});
    }, 1500);

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: {...form}});
          };    
    }

    onDateChange = (e) => {
      const form = this.state.form;
      form['date'] = e.target.value;
      this.setState({form: {...form}});
      this.onDateProcess(e.target.value);
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
          <Form.Field>
            <label>Scheduled</label>
            <input type="text" placeholder='human readable string' value={this.state.form.date} onChange={this.onDateChange} />
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


