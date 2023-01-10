import Header from '../../comment/Header/Header'
import axios from 'axios'
import { NavLink,useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
export default function SignUp() {
    let history = useHistory()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [pad,setPad] = useState()
    const [meg,setMeg] = useState()
    const [stuta,setStuta] = useState(false)
    
    let obj ={
        'user':{
            'username':name,
            'email':email,
            'password':pad,
        }
    }
    const {data,isError,error} = useQuery(['signip',obj],()=>{
        return  axios(
            {
                url:'/api/users',
                method:'POST',
                data:obj
            })
    },{ enabled:stuta}
    )
    if(data){history.push('/login')}
    if (isError) { setMeg(error.message)} 
    return (
        <div className="auth-page">
            <Header/>
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                        <NavLink to='/login'>Have an account?</NavLink>
                        </p>
                        <ul className="error-messages">
                            <li>{meg}</li>
                        </ul>
                        <form>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Your Name" onChange={(e)=>{setName(e.target.value)}} />
                            </fieldset>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}  />
                            </fieldset>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e)=>{setPad(e.target.value)}}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" onClick={()=>setStuta(true)}>
                            Sign up
                            </button>
                        </form>
                     </div>
                </div>
            </div>
        </div>
      
    );
  }