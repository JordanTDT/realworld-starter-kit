import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
export default function Tag(props){
    const {data:tag} = useQuery(['tag'],()=>{
        return   axios({
                    url:'/api/tags',
                    method:"GET"
                })
    }
    )
    const taglist = tag?.data.tags
    function handle(value){
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