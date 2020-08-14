import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Items } from './pages/items';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { Grid, Segment, Menu, Icon, Sidebar, Form } from 'semantic-ui-react'
import { Dimensions } from './pages/dimensions';
import { Dimensions as dims } from './models/dimensions';
import { Assistant } from './pages/assistant';
import RatingExampleControlled from './components/rating';

class App extends React.Component {


  constructor() {    
    super();
    const fdims = {};
    dims.forEach( i => fdims[i.id] = 0);
    this.state = {
      items: [],
      filterDimensions: fdims,
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
    this.setState({ values: [...this.state.values, newItem] });
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

  menuItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  onfilterDimChange = (id) => {
    const state = this.state.filterDimensions;
    return (v) => {
      state[id] = v;
      this.setState({filterDimensions: state});
    };
  }

  render() {
    return (
      <Router>
        <Grid columns={1} style={{ marginTop: '0.5rem' }}>
          <Grid.Column>
            <div className="ui two column container grid">
              <div className="column">
                <h2>Focus-2</h2>
                {/* <div className="message ui orange">Data is stored locally. To use this app in production open this URL in your favorite browser.</div> */}
              </div>
              <div className="column">
                <div className="ui container right aligned">
                  <button className="ui icon button" onClick={() => { this.setState({ visible: !this.state.visible }) }}>
                    <i className="align justify icon"></i>
                  </button>
                </div>
              </div>
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
                <Link to="/focus">
                  <Menu.Item
                    name='focus'
                    as='li'
                    active={this.state.activeItem === 'focus'}
                    onClick={this.menuItemClick}
                  >
                    <Icon name='crosshairs' />
                    Focus
                  </Menu.Item>
                </Link>
                <Link to="/">
                  <Menu.Item
                    name='all'
                    as='li'
                    active={this.state.activeItem === 'all'}
                    onClick={this.menuItemClick}
                  >
                    <Icon name='sort amount down' />
                    Full List
                  </Menu.Item>
                </Link>
{/*                 <Link to="/dimensions">
                  <Menu.Item
                    name='dimensions'
                    as='li'
                    active={this.state.activeItem === 'dimensions'}
                    onClick={this.menuItemClick}
                  >
                    <Icon name='braille' />
                    Dimensions
                  </Menu.Item>
                </Link>
*/}                
                <Link to="/assistant">
                  <Menu.Item
                    name='assistant'
                    as='li'
                    active={this.state.activeItem === 'assistant'}
                    onClick={this.menuItemClick}
                  >
                    <Icon name='braille' />
                    Dimensions
                  </Menu.Item>
                </Link>
              </Sidebar>

              <Sidebar.Pusher>
                <Segment basic>
                  <div className="ui container">
                    <Switch>
                      <Route exact path="/">
                        <Items onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.state.items}></Items>
                      </Route>
                      <Route path="/focus">
                        <Items focusActive={true} onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.state.items}></Items>
                      </Route>
                      <Route path="/dimensions">
                        <Dimensions items={this.state.items}></Dimensions>
                      </Route>
                      <Route path="/assistant">
                        {dims.map(dim => {
                          return (
                            <Form.Field key={dim.id}>
                              <RatingExampleControlled value={this.state.filterDimensions[dim.id]} onChange={this.onfilterDimChange(dim.id)} name={dim.name}></RatingExampleControlled>
                            </Form.Field>
                          );
                        })}
                        <Assistant filter={this.state.filterDimensions} items={this.state.items}></Assistant>
                      </Route>
                    </Switch>
                    <div className="ui vertical footer" style={{ marginTop: '40px' }}>
                      <div className="ui container">
                        <footer><em><a href="https://sp33c.tech">sp33c.tech</a></em> 2020</footer>
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
