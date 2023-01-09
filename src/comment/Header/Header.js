import { NavLink } from 'react-router-dom'
import axios from 'axios'
import React, { useState,useEffect } from 'react'

export default function Header(){
    const [name,Setname] = useState()
    const [islogin,SetLogin] = useState()
    
    useEffect(()=>{
        if(sessionStorage.getItem("token")) {
            axios({
                url: '/api/user',
                method: "GET",
                headers: {
                  Authorization:`Token ${ sessionStorage.getItem('token')}`,
                }
              }).then(res => {
                if (res.status == 200) {
                   Setname(res.data.user.username)
                }
              })

            SetLogin(true)
        }
    },[])
    return (
        <div>
             <nav className="navbar navbar-light">
                <div className="container">
                    <NavLink to="/index" className="navbar-brand">conduit</NavLink>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                           <NavLink to="/index" className="nav-link">home</NavLink>
                        </li>
                        {islogin&&
                        <li className="nav-item">
                          <NavLink to="/newArticle" className="nav-link">New Article</NavLink>
                        </li>
                        }
                        {islogin&&
                        <li className="nav-item">
                          <NavLink to="/profile" className="nav-link">{name}</NavLink>
                        </li>
                        }
                         {islogin&&
                        <li className="nav-item">
                          <NavLink to="/setting" className="nav-link">Setting</NavLink>
                        </li>
                        }
                        {islogin||
                            <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Sign in</NavLink>
                            </li> 
                        }
                        {islogin||
                            <li className="nav-item">
                            <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                            </li>
                        }
                        
                    </ul>
                </div>
              </nav>
        </div>
    )
}