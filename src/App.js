import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Items } from './pages/items';
import MenuExampleStackable from './components/nav';

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

  onUpdate = (formParams) => {
    const updatedItems = [...this.state.items.map(
      i => {
        if (i.id === formParams.id) {
          return {...formParams};
        } else {
          return i;
        }        
      }
    )];
    this.setState({items: updatedItems});
    localStorage.setItem('items', JSON.stringify([...updatedItems]));
    return true;
  }

  onDeleteItem = (id) => () => {
    const items = this.state.items.filter( i => i.id !== id);
    this.setState({items: items});
    localStorage.setItem('items', JSON.stringify([...items]));
  }

  componentDidMount(){
    const items = JSON.parse(localStorage.getItem('items')) || [];
    this.setState({
      items: items
    });    
  }


  toggleNew = () => {
    this.setState({showNewForm: true});
  }

  render () {
    return (
      <div class="ui container">
        <MenuExampleStackable></MenuExampleStackable>
        <div className="ui message yellow">Currently persistency works only in each particular browser window! To work with this app in production please bookmark this URL in your favorite browser and open it there consistently from now on.</div>
        <Items onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.state.items}></Items>
        <div class="ui vertical footer">
          <div class="ui container">
            <footer><em>sp33c</em> 2020; all rights reserved; info@sp33c.tech</footer> 
          </div>
        </div>      
      </div>      
    );  
  }
}

export default App;
