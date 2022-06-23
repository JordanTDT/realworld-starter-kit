import axios from 'axios'
import React, { Component } from 'react'
import FeedItem from '../FeedItem/FeedItem'

export default class GlobalFeed extends Component {
    state = {
        feedList:[]
    }
    componentDidMount() {
        this.getGlobalFeed()
    }
    render() {
        return (
            <div>
               {this.state.feedList.length>0 && <FeedItem feedData={this.state.feedList}></FeedItem>}
            </div>
        )
    }
    getGlobalFeed() {
        axios({
            url:'/api/articles?limit=20&offset=0',
            method:"GET"
        }).then(res => {
            if(res.status == 200) {
                this.setState({
                    feedList:res.data.articles
                })
            }
        })
    }
}
