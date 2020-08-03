import React from 'react';
import './App.css';
import {MainList} from './focus/main';
import {NewInput} from './focus/new-input';
import { v4 as uuidv4 } from 'uuid';
//import Repository from './services/repository';

class App extends React.Component {

  constructor () {
    super();
    this.state = {items: []};
  }

  onAdd = ({title, desc}) => {
    const newItem = {id: uuidv4(), title: title, desc: desc};
    console.log('add', newItem);
    this.setState({items: [...this.state.items, newItem]});    
    localStorage.setItem('items', JSON.stringify([...this.state.items, newItem]));
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

  render () {
    return (
      <div className="ui">
        <MainList onDelete={this.onDelete} items={this.state.items}></MainList>
        <NewInput onAdd={this.onAdd}></NewInput>
      </div>    
    );  
  }
}

export default App;
