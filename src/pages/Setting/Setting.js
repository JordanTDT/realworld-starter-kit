import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import Header from '../../components/Header/Header'

export default function Setting() {
    let history =useHistory()
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [url, setUrl] = useState()
    const [newPassword, setNewPassword] = useState()
    const [bio, setBio] = useState()
    function upDataUserInfo() {
        let obj = {
            "user": {
                "email": email,
                "password": newPassword,
                "token": sessionStorage.getItem('token'),
                "bio": bio,
                "image": url
            }
        }
        console.log(obj);
        axios({
            url: '/api/user',
            method: "PUT",
            data: obj,
            headers: {
              Authorization:`Token ${ sessionStorage.getItem('token')}`,
            }
          }).then(res => {
            if (res.status == 200) {
                history.push('/user')
            }
          })
    }
    function getUserInfo() {
        axios({
            url: '/api/user',
            method: "GET",
            headers: {
                Authorization: `Token ${sessionStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status == 200) {
                setUserName(res.data.user.username)
                setEmail(res.data.user.email)
                setBio(res.data.user.bio)
                setUrl(res.data.user.image)
            }
        })
    }
   
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <div>
            <Header></Header>
            <div className="settings-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>
                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control" type="text" placeholder="URL of profile picture" value={url ? url : ''} onChange={(e) => { setUrl(e.target.value) }} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={userName ? userName : ''} onChange={(e) => { setUserName(e.target.value) }} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control form-control-lg" rows="8"
                                            placeholder="Short bio about you" value={bio ? bio : ''} onChange={(e) => { setBio(e.target.value) }}></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Email" value={email ? email : ''} onChange={(e) => { setEmail(e.target.value) }} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
                                    </fieldset>
                                    <button className="btn btn-lg btn-primary pull-xs-right" onClick={() => { upDataUserInfo() }}>
                                        Update Settings
                                    </button>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
    
}

