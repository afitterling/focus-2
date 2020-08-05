import React from 'react';
import './App.css';
import {MainList} from './focus/main';
import {NewInput} from './focus/new-input';
import { v4 as uuidv4 } from 'uuid';
import { RadarChart } from './graphs/radar';
import { Container } from 'semantic-ui-react';

const dimensions = [
  {key: 'leisure', label: 'Leisure'},
  {key: 'career', label: 'Job Career'},
  {key: 'reconsilation', label: 'Life/Freedom'},
  {key: 'health', label: 'Health'},
  {key: 'family', label: 'Family'},
  {key: 'sustain', label: 'Sustainability'}
  ];

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      items: [],
      showNewForm: false,
      values: []
    };
  }

  onAdd = (formParams) => {
    const newItem = {id: uuidv4(), ...formParams};
    console.log(newItem);
    this.setState({items: [...this.state.items, newItem]});    
    localStorage.setItem('items', JSON.stringify([...this.state.items, newItem]));
    this.setState({showNewForm: false});
    // so cool!
    const {id, desc, title, ...formParamsDimensions} = {...formParams}; // exclude id desc title
    this.setState({values: [...this.state.values, {key: newItem.id, label: title, values: {...formParamsDimensions}}]});
  }

  onDelete = (id) => () => {
    console.log('onDelete', id);
    const items = this.state.items.filter( i => i.id !== id);
    this.setState({items: items});
    localStorage.setItem('items', JSON.stringify([...items]));
  }

  componentDidMount(){
    const items = JSON.parse(localStorage.getItem('items')) || [];
    console.log(items);
    const values = items.map(
      (i) => {
        return {
          key: i.id,
          label: i.title,
          values: {
            leisure: parseInt(i.leisure) || 0,
            career: parseInt(i.career) || 0,
            reconsilation: parseInt(i.reconsilation) || 0,
            health: parseInt(i.health)  || 0,
            family: parseInt(i.family)  || 0,
            sustain: parseInt(i.sustain)  || 0
          }
        }
      }
    )
;
    console.log(
      values
    );
    this.setState({
      items: items,
      values: values
    });    
  }


  toggleNew = () => {
    this.setState({showNewForm: true});
  }

  render () {
    return (
      <div className="ui">
        <MainList onDelete={this.onDelete} items={this.state.items}></MainList>
        { 
          this.state.showNewForm ? <NewInput onAdd={this.onAdd}></NewInput> : 
          <button className="ui button icon" onClick={this.toggleNew}><i className="circle icon plus"></i></button>
        }        
        <Container>
          <RadarChart variables={dimensions} values={this.state.values}></RadarChart>
        </Container>
      </div>    
    );  
  }
}

export default App;
