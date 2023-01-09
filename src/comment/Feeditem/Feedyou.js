import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Feed from '../Feed/Feed'
export default function Feedyou(){
    const [feedList,Setlist] = useState([])
    useEffect(()=>{
        getlist()
    },[])
    function getlist(){
        axios({
            url:'/api/articles/feed?limit=20&offset=0',
            method:"GET",
            headers: {
                Authorization:`Token ${ sessionStorage.getItem('token')}`,
             }
        }).then(res => {
            if(res.status == 200) {
                Setlist(res.data.articles)    
            }
        })
    }
    return(
        <div>
            {
                feedList.length>0 ? <Feed list={feedList}></Feed>:<p className='feedNull'>No articles are here... yet.</p>
            }
        </div>
    )
}