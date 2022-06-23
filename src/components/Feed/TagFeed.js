import axios from 'axios'
import React, { Component } from 'react'
import FeedItem from '../FeedItem/FeedItem'

export default class TagFeed extends Component {
  state = {
    feedList: this.props.feedList,
  }

  render() {
    return (
      <div>
        {this.state.feedList.length > 0 && <FeedItem feedData={this.state.feedList}></FeedItem>}
      </div>
    )
  }
  
}
