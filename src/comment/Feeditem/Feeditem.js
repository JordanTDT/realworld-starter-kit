import Feed from "../Feed/Feed";
import React, { useState,useEffect } from 'react'
export default function Feeditem(props){
    // const [list,Setlist] = useState()
    // useEffect(()=>{
    //     Setlist(props.feedList)
    // },[])
    return(
        <div>
            {
             props.feedList &&  <Feed list={props.feedList}></Feed> 
            }
        </div>
    )
}