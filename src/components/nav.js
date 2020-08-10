import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleStackable extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <img alt="" src='https://react.semantic-ui.com/logo.png' /> <b>Focus-2</b>
        </Menu.Item>

        <Menu.Item
          name='items'
          active={activeItem === 'items'}
          onClick={this.handleItemClick}
        >
          Overview
        </Menu.Item>

      </Menu>
    )
  }
}

