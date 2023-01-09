import axios from 'axios'
import React, { useState,useEffect } from 'react'
export default function Tag(props){
    const [taglist,Setlist] = useState()
    useEffect(()=>{
       Taglist()
    },[])
    function Taglist(){
        axios({
            url:'/api/tags',
            method:"GET"
        }).then(res => {
            // console.log(res);
            if(res.status == 200) {
                Setlist(res.data.tags)
            }
        })
    }
    function handle(value){
        // console.log(value)
        props.click(value)
    }
    return(
             <div className="col-md-3">
                <div className="sidebar">
                    <p>Popular Tags</p>
                    <div className="tag-list">
                        {
                           taglist && taglist.map(item=>{return <span className="tag-pill tag-default" key={item} onClick={()=>handle(item)}>
                             {item}
                            </span>}
                            )
                        }
                    </div>
                </div>
             </div>
    )
}