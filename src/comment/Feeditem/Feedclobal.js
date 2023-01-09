import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Feed from '../Feed/Feed'
export default function Feedclobal(){
    const [feedList,Setlist] = useState()
    useEffect(()=>{
        getlist()
    },[])
    function getlist(){
        axios({
            url:'/api/articles?limit=20&offset=0',
            method:"GET"
        }).then(res => {
            if(res.status == 200) {
                Setlist(res.data.articles)    
            }
        })
    }
    return(
        <div>
            {
                feedList && <Feed list={feedList}></Feed>
            }
        </div>
    )
}