
import GlobalFeed from '../Feed/GlobalFeed'
import Tage from '../Tage/Tage'
import React, { Component } from 'react'
import YourFeed from '../Feed/YourFeed'
import TagFeed from '../Feed/TagFeed'
import axios from 'axios'

export default class Center extends Component {
    state = {
        isLogin:false,
        isActive:1,
        tagName:'',
        feedList:[]
    }
    componentDidMount() {
        if(sessionStorage.getItem("token")) {
            this.setState({
                isLogin:true
            })
        }
    }
  render() {
    return (
         <div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {this.state.isLogin && <li className="nav-item">
                                    <span className={this.state.isActive==2 ? 'active nav-link' :'nav-link'} onClick={() =>{
                                        if(this.state.isActive!==2) {
                                            this.setState({
                                                isActive:2,
                                                tagName:''
                                            })
                                        }
                                    }}>Your Feed</span>
                                </li>}
                                <li className="nav-item">
                                    <span className={this.state.isActive==1 ? 'active nav-link' :'nav-link'} onClick={() =>{
                                        if(this.state.isActive !== 1) {
                                            this.setState({
                                                isActive:1,
                                                tagName:''
                                            })
                                        }
                                    }}>Global Feed</span>
                                </li>
                                {this.state.tagName && <li className="nav-item">
                                    <span className='active nav-link'>#{this.state.tagName}</span>
                                </li>}
                            </ul>
                        </div>
                        {this.state.isActive==1 ? <GlobalFeed></GlobalFeed> : this.state.isActive==2 ?<YourFeed></YourFeed>:this.state.feedList.length>0&&<TagFeed feedList={this.state.feedList}></TagFeed>}
                    </div>
                    <Tage click={this.onClick}></Tage>
                </div>
            </div>
        </div>
    )
  }
  onClick= (value) =>{
    
    this.setState({
        feedList:[],
        tagName:value,
        isActive:3
    })
    this.getGlobalFeed(value)
  }
  async getGlobalFeed(val) {
    let res = await axios({
      url: `/api/articles?tag=${val}&limit=20&offset=0`,
      method: "GET",
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
    if (res.status == 200) {
        this.setState({
          feedList: res.data.articles
        })
      }
  }
}
