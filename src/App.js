import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Items } from './pages/items';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { Grid, Segment, Menu, Icon, Sidebar } from 'semantic-ui-react'

class App extends React.Component {


  constructor() {
    super();
    this.state = {
      items: [],
      visible: false,
      showNewForm: false,
      values: []
    };
  }

  onAdd = (formParams) => {
    const newItem = { id: uuidv4(), ...formParams };
    console.log(newItem);
    this.setState({ items: [...this.state.items, newItem] });
    localStorage.setItem('items', JSON.stringify([...this.state.items, newItem]));
    this.setState({ showNewForm: false });
    // so cool!
    const { id, desc, title, ...formParamsDimensions } = { ...formParams }; // exclude id desc title
    this.setState({ values: [...this.state.values, { key: newItem.id, label: title, values: { ...formParamsDimensions } }] });
  }

  onUpdate = (formParams) => {
    const updatedItems = [...this.state.items.map(
      i => {
        if (i.id === formParams.id) {
          return { ...formParams };
        } else {
          return i;
        }
      }
    )];
    this.setState({ items: updatedItems });
    localStorage.setItem('items', JSON.stringify([...updatedItems]));
    return true;
  }

  onDeleteItem = (id) => () => {
    const items = this.state.items.filter(i => i.id !== id);
    this.setState({ items: items });
    localStorage.setItem('items', JSON.stringify([...items]));
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    this.setState({
      items: items
    });
  }


  toggleNew = () => {
    this.setState({ showNewForm: true });
  }

  render() {
    return (
      <Router>
        <Grid columns={1}>
          <Grid.Column>
            <div class="ui container right aligned">
              <button class="ui icon button" onClick={() => { this.setState({ visible: !this.state.visible }) }}>
                <i class="align justify icon"></i>
              </button>
            </div>
          </Grid.Column>

          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                onHide={() => { this.setState({ visible: false }) }}
                visible={this.state.visible}
                width='thin'
              >
                <Link to="/">
                  <Menu.Item as='a'>
                    <Icon name='tasks' />
                    Home
                  </Menu.Item>
                </Link>
                <Link to="/focus">
                  <Menu.Item as='a'>
                    <Icon name='eye' />
                    Focus
                  </Menu.Item>
                </Link>
              </Sidebar>

              <Sidebar.Pusher dimmed={this.state.visible}>
                <Segment basic>
                  <div class="ui container">
                    <Switch>
                      <Route exact path="/">
                        <Items onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.state.items}></Items>
                      </Route>
                      <Route path="/focus">
                      <Items focusActive={true} onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.state.items}></Items>
                      </Route>
                    </Switch>
                    <div class="ui vertical footer" style={{ marginTop: '40px' }}>
                      <div class="ui container">
                        <footer><em>sp33c.tech</em> 2020</footer>
                      </div>
                    </div>
                  </div>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default App;
