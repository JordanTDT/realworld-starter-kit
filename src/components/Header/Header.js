import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    state = {
        isLogin: false,
        userName:''
    }
    componentDidMount() {
        if(sessionStorage.getItem("token")) {
            this.getUserInfo()
            this.setState({
                isLogin:true
            })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-light">
                        <div className="container">
                            {/* <a className="navbar-brand" href="index.html">conduit</a> */}
                            <NavLink to='/index' className="navbar-brand">conduit</NavLink>
                            <ul className="nav navbar-nav pull-xs-right">
                                <li className="nav-item">
                                    <NavLink to='/index' className="nav-link">Home</NavLink>
                                </li>                             
                                {this.state.isLogin && <li className="nav-item">
                                    {/* <a className="nav-link" href="">
                                        <i className="ion-compose"></i>&nbsp;New Article
                                    </a> */}
                                    <NavLink to="/newArticle" className="nav-link">New Article</NavLink>
                                </li>}
                                {this.state.isLogin &&  <li className="nav-item">
                                    {/* <a className="nav-link" href="">
                                        <i className="ion-gear-a"></i>&nbsp;Settings
                                    </a> */}
                                    <NavLink to="/setting" className="nav-link">Settings</NavLink>
                                </li>}
                                {this.state.isLogin &&  <li className="nav-item">
                                    {/* <a className="nav-link" href="">
                                        <i className="ion-gear-a"></i>&nbsp;Settings
                                    </a> */}
                                    <NavLink to="/user" className="nav-link">{this.state.userName}</NavLink>
                                </li>}
                                {this.state.isLogin || <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Sign in</NavLink>
                                </li>}
                                {this.state.isLogin ||  <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Sign up</NavLink>
                                </li>}
                               
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
    getUserInfo() {
        axios({
            url: '/api/user',
            method: "GET",
            headers: {
              Authorization:`Token ${ sessionStorage.getItem('token')}`,
            }
          }).then(res => {
            if (res.status == 200) {
             this.setState({
                userName:res.data.user.username
             })
            }
          })
        }
}
