import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'

export default function UserInfo() {
    const [userName,setUserName] = useState()
    const [imgUrl,setImgUrl] = useState()
    const [bio,setBio] = useState()
    const [isActive,setIsActive] = useState(true)
    const [feedList,setFeedList] = useState([])
    async function getUserInfo() {
        let res = await axios({
            url: '/api/user',
            method: "GET",
            headers: {
                Authorization: `Token ${sessionStorage.getItem('token')}`,
            }
        })
        if (res.status == 200) {
                setUserName(res.data.user.username)
                setImgUrl(res.data.user.image)
                setBio(res.data.user.bio)
                getGlobalFeed(res.data.user.username)
        }
    }
    // 创建成功了 通过作者获取不到创建的article
    function getGlobalFeed(userName) {
        axios({
            url:`/api/articles?author=${userName}&limit=20&offset=0`,
            method:"GET",
        }).then(res => {
            if(res.status == 200) {
                setFeedList(res.data.articles)
            }
        })
    }
    useEffect(() =>{
        getUserInfo()
    },[])
    return (
        <div>
            <Header></Header>
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 col-md-10 offset-md-1">
                                
                                {/* {imgUrl?<img src={imgUrl} className="user-img" />:<img src='..\logo512.png' className="user-img" />} */}
                                <img src='..\logo512.png' className="user-img"></img>
                                <h4 >{userName}</h4>
                               {bio?<p>{bio}</p>:''}
                                <button className="btn btn-sm btn-outline-secondary action-btn">
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
                                        <span className={isActive?"nav-link active":"nav-link"} onClick={() => {
                                            if(isActive===false) {
                                                setIsActive(true)
                                            }
                                        }}>My Articles</span>
                                    </li>
                                    <li className="nav-item">
                                    <span className={!isActive?"nav-link active":"nav-link"} onClick={() =>{
                                        if(isActive===true) {
                                            setIsActive(false)
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
