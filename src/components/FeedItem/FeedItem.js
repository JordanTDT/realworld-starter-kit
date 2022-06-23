import React, { Component } from 'react'

export default class FeedItem extends Component {
    state = {
        feedList: this.props.feedData
    }

    render() {
        return (
            <div>
                {this.state.feedList.map((item,index) =>
                    <div className="article-preview" key={index}>
                        <div className="article-meta">
                            <a href="profile.html"><img src={item.author.image} /></a>
                            <div className="info">
                                <a href="" className="author">{item.author.username}</a>
                                <span className="date">{item.createdAt.slice(0,10)}</span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i> {item.favoritesCount}
                            </button>
                        </div>
                        <a href="" className="preview-link">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <span>Read more...</span>
                        </a>
                    </div>)}
            </div>
        )
    }
}
