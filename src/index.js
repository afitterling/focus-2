import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import history from './utils/history';
import { v4 as uuidv4 } from 'uuid';

const items = JSON.parse(localStorage.getItem('items')) || [];
const userId = JSON.parse(localStorage.getItem('userId')) || uuidv4();
const initialState ={
  items: items,
  userId: userId
}

localStorage.setItem('userId', JSON.stringify(userId));

const store = configureStore(initialState, history);
store.subscribe(()=>{
  console.log('newSate', store.getState());
});
setTimeout(()=>{
  store.dispatch({type: 'ITEM_ADD', data: {id: 3, 'title': 'sdfsdfdf'}});
}, 5000);

/*
store.dispatch({type: 'ITEM_ADD', data: {id: '1', title: 'title1'}});
store.dispatch({type: 'ITEM_ADD', data: {id: '2', title: 'title1'}});
store.dispatch({type: 'ITEM_ADD', data: {id: '3', title: 'title1'}});
*/
//console.log(store.getState());

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App/>
  </Provider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

