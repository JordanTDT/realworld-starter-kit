import { NavLink } from 'react-router-dom'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Header(){
    // const [name,Setname] = useState()
    const token =  sessionStorage.getItem("token")
    const {data:user} = useQuery(['header'],
      ()=>{
        return  axios({
                      url: '/api/user',
                      method: "GET",
                      headers: {
                        Authorization:`Token ${ sessionStorage.getItem('token')}`,
                      }
                    })
      
      },{ enabled: !!token })
      let name = user?.data?.user.username
      // console.log(name)
    return (
        <div>
             <nav className="navbar navbar-light">
                <div className="container">
                    <NavLink to="/index" className="navbar-brand">conduit</NavLink>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                           <NavLink to="/index" className="nav-link">home</NavLink>
                        </li>
                        {user&&
                        <li className="nav-item">
                          <NavLink to="/newArticle" className="nav-link">New Article</NavLink>
                        </li>
                        }
                        {user&&
                        <li className="nav-item">
                          <NavLink to="/profile" className="nav-link">{name}</NavLink>
                        </li>
                        }
                         {user&&
                        <li className="nav-item">
                          <NavLink to="/setting" className="nav-link">Setting</NavLink>
                        </li>
                        }
                        { !user && 
                            <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Sign in</NavLink>
                            </li> 
                        }
                        { !user && 
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