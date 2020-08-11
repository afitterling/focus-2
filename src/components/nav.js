import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleStackable extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    //const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <h2 class="ui header">
            <i class="calendar icon"></i>
            <div class="content">
              Focus-2
            </div>
          </h2>
        </Menu.Item>

        {/*         <Menu.Item
          name='items'
          active={activeItem === 'items'}
          onClick={this.handleItemClick}
        >
          Overview
        </Menu.Item>
 */}
      </Menu>
    )
  }
}

