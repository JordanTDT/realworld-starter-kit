import axios from 'axios'
import React, { Component } from 'react'
import FeedItem from '../FeedItem/FeedItem'

export default class YourFeed extends Component {
  state = {
    feedList: []
  }
  componentDidMount() {
    this.getGlobalFeed()
  }
  render() {
    return (
      <div>
        {this.state.feedList.length > 0 ? <FeedItem feedData={this.state.feedList}></FeedItem>:<p className='feedNull'>No articles are here... yet.</p>}
      </div>
    )
  }
  getGlobalFeed() {
    axios({
      url: '/api/articles/feed?limit=20&offset=0',
      method: "GET",
      headers: {
        Authorization:`Token ${ sessionStorage.getItem('token')}`,
      }
    }).then(res => {
      if (res.status == 200) {
        this.setState({
          feedList: res.data.articles
        })
      }
    })
  }
}
