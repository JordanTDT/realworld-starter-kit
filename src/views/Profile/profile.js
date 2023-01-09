import Header from '../../comment/Header/Header'
import axios from 'axios'
import React, { useState,useEffect } from 'react'

export default function Profile(){
    const [url,setUrl] = useState()
    const [name,setUsername] = useState()
    const [email,setEmail] = useState()
    const [pad,setPad] = useState()
    const [bio, setBio] = useState()
    const [bool, setbool] = useState(true)
   //获取用户信息
   async function getUser(){
      let res = await axios({
            url: '/api/user',
            method: "GET",
            headers: {
                Authorization: `Token ${sessionStorage.getItem('token')}`,
            }
            }).then(res => {
                if (res.status == 200) {
                 //   console.log(res)
                 //   console.log("123")
                    setUsername(res.data.user.username)
                    setEmail(res.data.user.email)
                    setBio(res.data.user.bio)
                    setUrl(res.data.user.image)
                    Carticle()
                }
            })
            // console.log(res)
    }
    function  Carticle(){
        axios({
            url:`/api/articles?author=${name}&limit=20&offset=0`,
            method:"GET",
        }).then(res => {
            if(res.status == 200) {
                console.log(res.data)
                setPad(res.data.articles)
            }
        })
    }
    useEffect(() => {
        getUser()
    }, [])
   return(
    <div>
          <Header></Header>
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                {url?<img src={url} className="user-img"></img>:<img src='..\logo512.png' className="user-img"></img>}
                                <h4 >{name}</h4>
                                {bio?<p>{bio}</p>:''}
                                <button className="btn btns-sm btn-outline-secondary action-btn">
                                    <i className="ion-plus-round"></i>
                                    &nbsp;
                                    Follow Eric Simons
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="articles-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <span className={bool?"nav-link active":"nav-link"} onClick={()=>{
                                            if(bool===false){
                                                setbool(true)
                                            }
                                        }} >My Articles</span>
                                    </li>
                                    <li className="nav-item">
                                    <span className={!bool?"nav-link active":"nav-link"} onClick={()=>{
                                            if(bool===true){
                                                setbool(false)
                                            }
                                        }}>Favorited Articles</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
   )
}