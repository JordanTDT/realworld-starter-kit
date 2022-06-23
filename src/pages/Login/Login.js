import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header/Header'


export default class Login extends Component {
    state = {
        email:'',
        password:'',
        errorMsg:'',
        isError:false,
    }
    render() {
        return (
            <div className="auth-page">
                <Header></Header>
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign in</h1>
                            <p className="text-xs-center">
                                <NavLink to='/register'>Need an account?</NavLink>
                            </p>

                            {this.state.isError && <ul className="error-messages">
                                <li>{this.state.errorMsg}</li>
                            </ul>}

                            <form>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e) => { this.setState({email:e.target.value})}}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e) => { this.setState({password:e.target.value})}}/>
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" onClick={() => {this.signIn()}}>
                                    Sign in
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    signIn() {
        if(this.state.email&&this.state.password) {
            let obj = {
                "user": {
                  "email": this.state.email,
                  "password": this.state.password
                }
              }
           axios({
            url:'/api/users/login',
            method:'POST',
            data:obj
           }).then(res => {
            console.log(res);
            if(res.status ==200) {
                sessionStorage.setItem('token',res.data.user.token)
                this.props.history.push('/index')
            }
           }).catch(error => {
            let msg = JSON.stringify(JSON.parse(error.request.response).errors).slice(1,-1)
            this.setState({
                errorMsg:msg,
                isError:true
            })
           })
        }
    }
}

