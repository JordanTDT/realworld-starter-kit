import Header from '../../comment/Header/Header'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
export default function Sign() {
    let history = useHistory()
    const [name,setname] = useState()
    const [email,setEmail] = useState()
    const [pad,setPad] = useState()
    const [meg,setmeg] = useState()
    function SignIp(){
        let obj ={
            'user':{
                'email':email,
                'password':pad,
            }
        }
        axios(
            {
                url:'/api/users/login',
                method:'POST',
                data:obj
            }).then(res=>{
                if(res.status == 200 ){
                    console.log("成功")
                    sessionStorage.setItem('token',res.data.user.token)
                    history.push('/index')
                }
            }).catch(error =>{
                console.log(error)
                setmeg(error.message)
            })
        
 
        // console.log(obj)
    }
    return (
        <div className="auth-page">
            <Header/>
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                        <NavLink to='/signup'>Need an account?</NavLink>
                        </p>
                        <form>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}  />
                            </fieldset>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e)=>{setPad(e.target.value)}}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" onClick={()=>SignIp()}>
                            Sign up
                            </button>
                        </form>
                     </div>
                </div>
            </div>
        </div>
      
    );
  }