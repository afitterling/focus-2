import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Items } from './pages/items';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { Grid, Segment, Menu, Icon, Sidebar, Form } from 'semantic-ui-react'
import { Dimensions } from './pages/dimensions';
import Settings from './pages/settings';
import { Dimensions as dims, groups } from './models/dimensions';
import { congruentMatcher, filterItems } from './pages/assistant';
import RatingExampleControlled from './components/rating';
import { RadarChart as Radar } from './components/graphs/radar';
import Repository from './services/repository';
import { connect } from 'react-redux';
import { ITEM_RM, ITEM_ADD } from './redux/actionTypes';

class App extends React.Component {

  constructor(props) {
    super(props);
    const fdims = {};
    console.log('appProps', props);
    dims.forEach(i => fdims[i.id] = 0);
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
    //this.setState({ items: [...this.state.items, newItem] });
    localStorage.setItem('items', JSON.stringify([...this.props.items, newItem]));
    //addItem(newItem);
    this.props.dispatch({ type: ITEM_ADD, data: newItem });
    this.setState({ showNewForm: false });
    // obsolete? this.setState({ values: [...this.state.values, newItem] });
  }

  onUpdate = (formParams) => {
    const updatedItems = [...this.props.items.map(
      i => {
        if (i.id === formParams.id) {
          return { ...formParams };
        } else {
          return i;
        }
      }
    )];
    //this.setState({ items: updatedItems });
    this.props.dispatch({ type: 'ITEM_UPDATE', data: formParams });
    localStorage.setItem('items', JSON.stringify([...updatedItems]));
    return true;
  }

  onDeleteItem = (id) => () => {
    this.props.dispatch({ type: ITEM_RM, id });
    const items = this.props.items.filter(i => i.id !== id);
    //    this.setState({ items: items });
    Repository.saveItems(items);
  }

  componentDidMount() {
  }

  toggleNew = () => {
    this.setState({ showNewForm: true });
  }

  menuItemClick = (e, { name }) => {
    console.log(name);
    this.setState({ activeItem: name });
  }

  onfilterDimChange = (id) => {
    const state = this.state.filterDimensions;
    return (v) => {
      state[id] = v;
      this.setState({ filterDimensions: state });
    };
  }

  getPageTitle = (menuItem) =>{
    if (!menuItem) return;
    const name = menuItem;
    switch (name) {
      case 'agenda':
        return 'Personal Agenda';
      case 'settings':
        return 'Settings';
      case 'assistant':
        return 'Personal Assistant';
      case 'focus':
        return 'In Focus';
      default:
        return 'unknown';
    }
  }
  render() {
    return (
      <Router>
        <Grid columns={1} style={{ marginTop: '0.5rem' }}>
          <Grid.Column>
            <div className="ui two column container grid">
              <div className="column">
                <h2 className="ui header">
                  <i className="circle outline icon"></i>
                  <div className="content">
                    Focus-2
                    <div className="sub header">Task & Activity Manager</div>
                  </div>
                </h2>
                {/* <div className="message ui orange">Data is stored locally. To use this app in production open this URL in your favorite browser.</div> */}
              </div>
              <div className="column">
                <div className="ui container right aligned">
                  <button className="ui icon button secondary" onClick={() => { this.setState({ visible: !this.state.visible }) }}>
                    <i className="expand icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="ui message blue container">
              The data is stored locally in this particular browser only. To use this app, open it in your favorite browser not to lose data or go
              to Settings to export and import your data.
            </div>
            <div className="ui container">
              <a className="button ui primary" href="https://forms.clickup.com/f/3fd87-1174/4V7XICVQA1BNJUB7JB">Press here to give Feedback about this App</a>
            </div>
            <div className="ui top attached tabular menu">
              <div className="active item">{this.getPageTitle(this.state.activeItem)}</div>
            </div>
          </Grid.Column>
          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                vertical
                onHide={() => { this.setState({ visible: false }) }}
                visible={this.state.visible}
                width='thin'
              >
                <Link to="/">
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
                <Link to="/agenda">
                  <Menu.Item
                    name='agenda'
                    as='li'
                    active={this.state.activeItem === 'agenda'}
                    onClick={this.menuItemClick}
                  >
                    <Icon circular name='user' />
                    Personal Agenda
                  </Menu.Item>
                </Link>
                {/*                 <Link to="/">
                  <Menu.Item
                    name='all'
                    as='li'
                    active={this.state.activeItem === 'all'}
                    onClick={this.menuItemClick}
                  >
                    <Icon name='sort amount down' />
                    Activities
                  </Menu.Item>
                </Link>
 */}                {/*                 <Link to="/dimensions">
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
                    Assistant
                  </Menu.Item>
                </Link>
                <Link to="/settings">
                  <Menu.Item
                    name='settings'
                    as='li'
                    active={this.state.activeItem === 'settings'}
                    onClick={this.menuItemClick}
                  >
                    <Icon name='settings' />
                    Settings
                  </Menu.Item>
                </Link>

              </Sidebar>

              <Sidebar.Pusher dimmed={this.state.visible}>
                <Segment basic>
                  <div className="ui container">
                    <Switch>
                       <Route exact path="/">
                        <Items focusActive={true} onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.props.items}></Items>
                        {
                          groups.map(grp => {
                            return (
                              <React.Fragment key={grp.id}>
                                <h2>{grp.name}</h2>
                                <Radar variables={dims.filter(d => d.groups.find(g => g === grp.id)).map(i => {
                                  return { key: i.id, label: i.name };
                                })} values={this.props.items.filter(i => i.focus).map(i => {
                                  return {
                                    key: i.id,
                                    label: i.title,
                                    values: i.dimensions
                                  }
                                })}></Radar>
                              </React.Fragment>
                            );
                          })
                        }

                      </Route>
                       <Route path="/agenda">
                        <Items focusActive={false} onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={this.props.items.filter(i => i.agenda)}></Items>
                        {
                          groups.map(grp => {
                            return (
                              <React.Fragment key={grp.id}>
                                <h2>{grp.name}</h2>
                                <Radar variables={dims.filter(d => d.groups.find(g => g === grp.id)).map(i => {
                                  return { key: i.id, label: i.name };
                                })} values={this.props.items.filter(i => i.agenda).map(i => {
                                  return {
                                    key: i.id,
                                    label: i.title,
                                    values: i.dimensions
                                  }
                                })}></Radar>
                              </React.Fragment>
                            );
                          })
                        }

                      </Route>
                      <Route path="/dimensions">
                        <Dimensions items={this.props.items}></Dimensions>
                      </Route>
                      <Route path="/settings">
                        <Settings></Settings>
                      </Route>
                      <Route path="/assistant">
                        <button style={{ marginBottom: '10px' }} className="ui secondary button" onClick={() => { this.setState({ showDim: !this.state.showDim }) }}><i className={this.state.showDim ? 'icon minus' : 'icon plus'}></i> Filter</button>
                        {
                          !!this.state.filterDimensions ? <button style={{ marginBottom: '10px' }} className="ui secondary button" onClick={() => { window.location.reload() }}><i className="icon trash"></i></button> : null
                        }
                        <div className="ui container">

                          {this.state.showDim ?
                            dims.sort((a,b)=>a.order - b.order).map(dim => {
                              return (
                                <Form.Field key={dim.id}>
                                  <RatingExampleControlled value={this.state.filterDimensions[dim.id]} onChange={this.onfilterDimChange(dim.id)} name={dim.name}></RatingExampleControlled>
                                </Form.Field>
                              );
                            }) : null
                          }
                        </div>
                        <Items focusActive={false} onItemDelete={this.onDeleteItem} onUpdateItem={this.onUpdate} onItemAdd={this.onAdd} items={filterItems(this.props.items, this.state.filterDimensions, congruentMatcher)}></Items>
                        {
                          groups.map(grp => {
                            return (
                              <React.Fragment key={grp.id}>
                                <h2>{grp.name}</h2>
                                <Radar variables={dims.filter(d => d.groups.find(g => g === grp.id)).map(i => {
                                  return { key: i.id, label: i.name };
                                })} values={filterItems(this.props.items, this.state.filterDimensions, congruentMatcher).map(i => {
                                  return {
                                    key: i.id,
                                    label: i.title,
                                    values: i.dimensions
                                  }
                                })}></Radar>
                              </React.Fragment>
                            );
                          })
                        }

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

const mapStateToProps = state => ({ items: state.items, userId: state.userId });
/*const mapDispatchToProps = {
  addItem
}*/
export default connect(
  mapStateToProps,
  //mapDispatchToProps
)(App);
