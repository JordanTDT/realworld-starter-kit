import Header from '../../comment/Header/Header'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'

export default function Setting(){
    let history =useHistory()
    const [url,setUrl] = useState()
    const [name,setUsername] = useState()
    const [email,setEmail] = useState()
    const [pad,setPad] = useState()
    const [bio, setBio] = useState()
    //获取回显数据
    function getUser(){
      axios({
        url: '/api/user',
        method: "GET",
        headers: {
            Authorization: `Token ${sessionStorage.getItem('token')}`,
        }
        }).then(res => {
            if (res.status == 200) {
              console.log(res)
                setUsername(res.data.user.username)
                setEmail(res.data.user.email)
                setBio(res.data.user.bio)
                setUrl(res.data.user.image)
            }
        })
    }
    useEffect(() => {
      getUser()
    }, [])
    function UpSetting(){
      let obj = {
        "user": {
            "email": email,
            "password": pad,
            "token": sessionStorage.getItem('token'),
            "bio": bio,
            "image": url
        }
      }
      axios({
        url: '/api/user',
        method: "PUT",
        data: obj,
        headers: {
          Authorization:`Token ${ sessionStorage.getItem('token')}`,
        }
        }).then(res => {
          if (res.status == 200) {
            console.log(res)
              history.push('/profile')
          }
        })
    }
    return(
        <div>
          <Header/>
            <div className="settings-page">
                <div className="container page">
                  <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                      <h1 className="text-xs-center">Your Settings</h1>
                      <form>
                        <fieldset>
                          <fieldset className="form-group">
                            <input className="form-control"  value={url ? url : ''} type="text" placeholder="URL of profile picture" onChange={(e)=>{setUrl(e.target.value)}} />
                          </fieldset>
                          <fieldset className="form-group">
                            <input  className="form-control form-control-lg"  value={name ? name : ''} type="text" placeholder="Your Name" onChange={(e)=>{setUsername(e.target.value)}}/>
                          </fieldset>
                          <fieldset className="form-group">
                            <textarea className="form-control form-control-lg" value={bio ? bio : ''} rows={8} placeholder="Short bio about you"   onChange={(e)=>{setBio(e.target.value)}}/>
                          </fieldset>
                          <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" value={email ? email : ''}  placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                          </fieldset>
                          <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="password" value={pad ? pad : ''} placeholder="Password"  onChange={(e)=>{setPad(e.target.value)}}/>
                          </fieldset>
                          <button className="btn btn-lg btn-primary pull-xs-right" onClick={()=>{UpSetting()}}>
                            Update Settings
                          </button>
                        </fieldset>
                      </form>
                      <hr />
                      {/* <button className="btn btn-outline-danger">
                        Or click here to logout.
                      </button> */}
                    </div>
                  </div>
                </div>
           </div>
         </div>
    )
}