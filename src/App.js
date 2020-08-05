import React from 'react';
import './App.css';
import {MainList} from './focus/main';
import {NewInput} from './focus/new-input';
import { v4 as uuidv4 } from 'uuid';
//import Repository from './services/repository';
import { RadarChart } from './graphs/radar';
import { Container } from 'semantic-ui-react';

const dimensions = [
  {key: 'health', label: 'Health'},
  {key: 'jobcareer', label: 'Job Career'},
  {key: 'leisure', label: 'Leisure'},
  {key: 'reconsilation', label: 'Reconsilation'},
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

  onAdd = ({title, desc, leisure, health, career, reconsilation}) => {
    const newItem = {id: uuidv4(), title, desc, leisure, health, career, reconsilation};
    console.log(newItem);
    this.setState({items: [...this.state.items, newItem]});    
    localStorage.setItem('items', JSON.stringify([...this.state.items, newItem]));
    this.setState({showNewForm: false});
    this.setState({values: [...this.state.values, {key: newItem.id, label: title, values: {leisure, health, career, reconsilation}}]});
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
    const values =       items.map(
      (i) => {
        return {
          key: '',
          label: '',
          values: {
            leisure: parseInt(i.leisure) || 0,
            reconsilation: parseInt(i.reconsilation) || 0,
            career: parseInt(i.career) || 0,
            health: parseInt(i.health)  || 0
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
