import Header from '../../comment/Header/Header'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
export default function Sign() {
    let history = useHistory()
    const [email,setEmail] = useState()
    const [pad,setPad] = useState()
    const [meg,setMeg] = useState()
    const [stuta,setStuta] = useState(false)
    
        let obj ={
            'user':{
                'email':email,
                'password':pad,
            }
        }
        const {data,isError,error,refetch} = useQuery(['signip',obj],()=>{
            return  axios(
                {
                    url:'/api/users/login',
                    method:'POST',
                    data:obj
                })
        },{ enabled:stuta}
        )
        console.log(data)
        if(data){ sessionStorage.setItem('token',data?.data?.user.token); refetch();history.push('/index')}
        if (isError) { setMeg(error.message)}

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