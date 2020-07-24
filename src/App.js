import React from 'react';
import './App.css';
import {MainList} from './focus/main';
import {NewInput} from './focus/new-input';

class App extends React.Component {

  constructor () {
    super();
    this.state = {items: []};
  }

  onAdd = ({title, desc}) => {
    console.log('add', title, desc);
    this.setState({items: [...this.state.items, {title: title, desc: desc}]});
  }

  render () {
    return (
      <div className="ui">
        <MainList items={this.state.items}></MainList>
        <NewInput onAdd={this.onAdd}></NewInput>
      </div>    
    );  
  }
}

export default App;
