import Header from '../../comment/Header/Header'
import axios from 'axios'
import { NavLink,useHistory } from 'react-router-dom'
import React, { useState } from 'react'
export default function Sign() {
    let history = useHistory()
    const [name,setname] = useState()
    const [email,setEmail] = useState()
    const [pad,setPad] = useState()
    const [meg,setmeg] = useState()
    function SignUp(){
        let obj ={
            'user':{
                'username':name,
                'email':email,
                'password':pad,
            }
        }
        axios(
            {
                url:'/api/users',
                method:'POST',
                data:obj
            }).then(res=>{
                if(res.status == 200 ){
                    console.log("成功")
                    history.push('/login')
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
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                        <NavLink to='/login'>Have an account?</NavLink>
                        </p>
                        <ul className="error-messages">
                            <li>{meg}</li>
                        </ul>
                        <form>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Your Name" onChange={(e)=>{setname(e.target.value)}} />
                            </fieldset>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}  />
                            </fieldset>
                            <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e)=>{setPad(e.target.value)}}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" onClick={()=>SignUp()}>
                            Sign up
                            </button>
                        </form>
                     </div>
                </div>
            </div>
        </div>
      
    );
  }