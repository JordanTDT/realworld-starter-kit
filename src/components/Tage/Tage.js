import axios from 'axios'
import React, { Component } from 'react'

export default class Tage extends Component {
    state = {
        tagList:[]
    }
    componentDidMount() {
        this.getTag()
    }
    render() {
        return (
            <div className="col-md-3">
                <div className="sidebar">
                    <p>Popular Tags</p>
                    <div className="tag-list">
                        {
                            this.state.tagList.map(item=><span className="tag-pill tag-default" onClick={() => {this.handleClick(item)}} key={item}>{item}</span>)
                        }
                        
                        {/* <span className="tag-pill tag-default">javascript</span>
                        <span className="tag-pill tag-default">emberjs</span>
                        <span className="tag-pill tag-default">angularjs</span>
                        <span className="tag-pill tag-default">react</span>
                        <span className="tag-pill tag-default">mean</span>
                        <span className="tag-pill tag-default">node</span>
                        <span className="tag-pill tag-default">rails</span> */}
                    </div>
                </div>
            </div>
        )
    }
    handleClick = (value) => {
        this.props.click(value)
    }
    getTag() {
        axios({
            url:'/api/tags',
            method:"GET"
        }).then(res => {
            console.log(res);
            if(res.status == 200) {
                this.setState({
                    tagList:res.data.tags
                })
            }
        })
    }
}
