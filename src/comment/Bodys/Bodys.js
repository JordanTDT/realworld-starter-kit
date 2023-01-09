import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Feed from '../Feed/Feed'
import Feedclobal from '../Feeditem/Feedclobal'
import Feeditem from '../Feeditem/Feeditem'
import Feedyou from '../Feeditem/Feedyou'
import Tag from '../Tag/Tag'
export default function Bodys(props){
    const [islogin,SetLogin] = useState()//判断登录状态
    const [isClass,SetClass] = useState(1)//判断点击模块
    const [valname,Setvalname] = useState()//点击的tag
    const [feedList,SetfeedList] = useState()//显示数据数组
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            SetLogin(true)
        }
    },[])
    function onClick(value){
        SetClass(3)
        Setvalname(value)
        getFeed(value)
    //    console.log(value)
    }
    // 获取数据
    async function getFeed(value){
        let res = await
        axios({
            url: `/api/articles?tag=${value}&limit=20&offset=0`,
            method: "GET",
            headers: {
              token: sessionStorage.getItem('token')
            }
          })
          if (res.status == 200) {
            SetfeedList(res.data.articles)
          }
    }
    return(
        <div>
            <div className="home-page">
                <div className="banner">
                    <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                    </div>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {islogin && 
                                <li className="nav-item">
                                    <span className={isClass == 2?'nav-link active':'nav-link'} onClick={()=>{
                                        if(isClass !==2){
                                            SetClass(2)
                                            Setvalname('')
                                        }
                                    }}>Your Feed</span>
                                </li>}
                                
                                <li className="nav-item">
                                        <span className={isClass == 1?'nav-link active':'nav-link'} onClick={()=>{
                                                if(isClass !==1){
                                                    SetClass(1)
                                                    Setvalname('')
                                                }
                                            }}>Global Feed</span>
                                </li>
                                {
                                    valname && 
                                    <li className="nav-item">
                                    <span className={'nav-link active'}>#{valname}</span>
                                    </li>
                                }
                            </ul>
                        </div>
                         {
                          isClass== 1?<Feedclobal></Feedclobal>:
                          isClass== 2?<Feedyou></Feedyou>:
                          <Feeditem  feedList={feedList}></Feeditem>
                         }
                    </div>
                    <Tag click={onClick.bind(this)}></Tag>
                </div>
            </div>
        </div>
    )
}