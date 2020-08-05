import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

export class RatingControlled extends Component {
  state = { rating: 0 }
  label = null;

  constructor(props){
    super(props);
    this.label = props.label;
    this.onValueChange = props.onValueChange;
  }

  handleChange = (e) => {
    this.setState({ rating: e.target.value })
    this.onValueChange(e.target.value);
  }

  render() {
    const { rating } = this.state

    return (
      <div>
        <div>{this.label}: {rating}</div>
        <input
          type='range'
          min={0}
          max={10}
          value={rating}
          onChange={this.handleChange}
        />
        <br />
        <Rating rating={this.state.rating} maxRating={5} />
      </div>
    )
  }
}
