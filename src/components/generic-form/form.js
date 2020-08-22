import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';
import moment from 'moment';
import RatingExampleControlled from '../../components/rating';
import { Dimensions as dims } from '../../models/dimensions'

export class ItemForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {form: this.props.item};
      console.log(this.state);
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
      if (value.toLowerCase() === 'today'){
        return moment(moment(), "ddd, DD.MM.YYYY");
      }
      if (value.toLowerCase() === 'tomorrow'){
        return moment(moment().add(1, 'days'), "ddd, DD.MM.YYYY");
      }
      if (moment(value, "D.MM.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.MM.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");

      if (moment(value, "D.M.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.M.YYYY").isValid()) return moment(value, "ddd, DD.MM.YYYY");

      if (moment(value, "D.M").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.M").isValid()) return moment(value, "ddd, DD.MM.YYYY");
      if (moment(value, "DD.MM").isValid()) return moment(value, "ddd, DD.MM.YYYY");

      if (moment(value, "ddd").isValid()) return moment(value, "ddd, DD.MM.YYYY").add(7, 'days');
      return moment(value, "ddd, DD.MM.YYYY");
    }

    onDimModalShow = () => {}

    onDateProcess = debounce((value) => {
      if (!value) return;
      
      const date = this.findAValidPattern(value);
      if (date.isValid()) this.setState({form: {...this.state.form, date: date.format('ddd, DD.MM.YYYY'), dateRaw: moment(date, 'ddd DD.MM.YYYY').format()}});
    }, 2500);

    onChange = (field) => {
        return (e) => {
            const form = this.state.form;
            form[field] = e.target.value;
            this.setState({form: {...form}});
          };    
    }

    onFocusChange = (e) => {
      const form = this.state.form;
      form['focus'] = !this.state.form.focus;
      this.setState({form: {...form}});
    }
    
    onDoingChange = (e) => {
      const form = this.state.form;
      form['inProgress'] = !this.state.form.inProgress;
      this.setState({form: {...form}});
    }

    onDateChange = (e) => {
      const form = this.state.form;
      form['date'] = e.target.value;
      this.setState({form: {...form}});
      this.onDateProcess(e.target.value);
    }

    onDimensionChange = (key) => {
      const form = this.state.form.dimesions ? this.state.form : Object.assign({dimensions: {}}, this.state.form);
      return (v) => { 
        form.dimensions[key] = v;
        this.setState({form});
      }
    }

    onResetDate = (e) => {
      const form = this.state.form;
      form['date'] = '';
      form['dateRaw'] = null;
      this.setState({form: {...form}});
    }

    componentDidUpdate({item}){
      if (item !== this.props.item){
        this.setState({form: {...this.props.item}});
      }
    }

    onResetInput(field){
      return () => { 
        const form = this.state.form;
        form[field] = '';
        this.setState({form: {...form}});
      };
    }

    onProgressChange = (value) => {
      const form = this.state.form;
      form['progress'] = value;
      this.setState({form: {...form}}); 
    }

    render(){
      return (
        <Form onSubmit={this.onSave} style={{padding: '0 5px 0 5px'}}>
          <Form.Field>
            <label>Title</label>
            <div className="ui action input">
              <input placeholder='name' value={this.state.form.title} onChange={this.onChange('title')} />
              <button type="button" onClick={this.onResetInput('title')} className="ui icon button">
                <i className="delete icon"></i>
              </button>
            </div>
          </Form.Field>
          <Form.Field disabled={!this.state.form.title}>
            <label>Description</label>
            <div className="ui action input">
              <input placeholder='description' value={this.state.form.desc} onChange={this.onChange('desc')} />
              <button type="button" onClick={this.onResetInput('desc')} className="ui icon button">
                <i className="delete icon"></i>
              </button>
            </div>
          </Form.Field>
          <Form.Field>
            <label>Scheduled</label>
            <div className="ui">
              E.g.: ,,today'', ,,tomorrow'', ,,Tue'', ,,4.5.'', ,,16.8.'', ,,1.10.2020''
            </div>
            <div className="ui action input">
              <input type="text" placeholder='human readable date' value={this.state.form.date} onChange={this.onDateChange} />
              <button type="button" onClick={this.onResetDate} className="ui icon button">
                <i className="delete icon"></i>
              </button>
            </div>
          </Form.Field>
          <Form.Field>
            <div className="ui checkbox">
              <input type="checkbox" checked={this.state.form.focus} onChange={this.onFocusChange} name={'focus'} />
              <label>Focus</label>
            </div>
          </Form.Field>
          <Form.Field>
            <div className="ui checkbox">
              <input type="checkbox" checked={this.state.form.inProgress} onChange={this.onDoingChange} name={'doing'} />
              <label>in-progress</label>
            </div>
          </Form.Field>
          <Form.Field>
            <RatingExampleControlled value={this.state.form.progress} onChange={this.onProgressChange} name={'Progress'}></RatingExampleControlled>
          </Form.Field>


          <button type="button" style={{ marginBottom: '10px' }} className="ui secondary button" onClick={() => { this.setState({ showDim: !this.state.showDim }) }}><i className={this.state.showDim ? 'icon minus' : 'icon plus'}></i> Dimensions</button><br/>

          {this.state.showDim ?
            <div className="ui container">
          {dims.sort((a,b)=> a.order - b.order).map( dim => {            
            return (
              <Form.Field key={dim.id}>
                <RatingExampleControlled value={this.state.form.dimensions[dim.id]} onChange={this.onDimensionChange(dim.id)} name={dim.name}></RatingExampleControlled>
              </Form.Field>
            );
          })}
            </div>
           : null
          }
          <div className="message ui">
            <Button type="button" className="button" onClick={this.props.onCancel}>Cancel</Button>
            <Button type="submit" 
              content="save"
              labelPosition='right'
              icon='checkmark'
              positive
            />
          </div>
        </Form>
      );
    }
}


