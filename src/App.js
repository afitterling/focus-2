import React from 'react';
import './App.css';
import {MainList} from './focus/main';
import {NewInput} from './focus/new-input';
import { v4 as uuidv4 } from 'uuid';
//import Repository from './services/repository';
import { RadarChart } from './graphs/radar';

const dimensions = [
  {key: 'health', label: 'Health'},
  {key: 'jobcareer', label: 'Job Career'},
  {key: 'leisure', label: 'Leisure'},
  {key: 'reconsilation', label: 'Reconsilation'},
];
const values = {
  health: 4,
  jobcareer: 6,
  leisure: 7,
  reconsilation: 0
}

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      items: [],
      showNewForm: false
    };
  }

  onAdd = ({title, desc}) => {
    const newItem = {id: uuidv4(), title: title, desc: desc};
    console.log('add', newItem);
    this.setState({items: [...this.state.items, newItem]});    
    localStorage.setItem('items', JSON.stringify([...this.state.items, newItem]));
    this.setState({showNewForm: false});
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
    this.setState({items: items});    
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
        <RadarChart variables={dimensions} values={values}></RadarChart>
      </div>    
    );  
  }
}

export default App;
