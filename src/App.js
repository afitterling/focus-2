import React from 'react';
import './App.css';
import {MainList} from './focus/main';
import {NewInput} from './focus/new-input';

function App() {

  const onAdd = ({title, desc}) => {
    console.log('add', title, desc);
  }

  return (
    <div className="ui">
      <MainList></MainList>
      <NewInput onAdd={onAdd}></NewInput>
    </div>    
  );
}

export default App;
