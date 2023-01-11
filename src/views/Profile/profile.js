import Header from '../../comment/Header/Header'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Profile(){
    const [ponseData,setResponseData] = useState()
    const [stuta, setStuta] = useState(false)
    const [bool, setbool] = useState(true)
   //获取用户信息
   const {data}= useQuery(['getuser'],()=>
   { return   axios({
                    url: '/api/user',
                    method: "GET",
                    headers: {
                        Authorization: `Token ${sessionStorage.getItem('token')}`,
                    }
                    }).then((res)=>{
                        setResponseData(data.data);
                        setStuta(true)
                    })

   }
      
    )
    const {res} = useQuery(['getres'],()=>{
        return  axios({
            url:`/api/articles?author=${ponseData.user.name}&limit=20&offset=0`,
            method:"GET",
        })
    },{enabled:!!stuta}
      
       )

   return(
    <div>
          <Header></Header>
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                {ponseData &&
                                  ponseData?<img src={ponseData.user.url} className="user-img"></img>:<img src='..\logo512.png' className="user-img"></img>}
                                {/* <h4 >{ponseData.name}</h4> */}
                                {ponseData && 
                                  ponseData?<p>{ponseData.user.bio}</p>:''}
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