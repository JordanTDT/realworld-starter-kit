import { useQuery,QueryClient , QueryClientProvider, } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Feed from '../Feed/Feed'

export default function Feedyou(){
   const {data : feedlist} = useQuery(['feedyou'],
   async ()=>
     axios({
        url:'/api/articles/feed?limit=20&offset=0',
        method:"GET",
        headers: {
            Authorization:`Token ${ sessionStorage.getItem('token')}`,
         }
    })
   )
   const feed= feedlist?.data.articles
    return(
        <div>
            {
              feed &&  feed.length > 0? <Feed list={feed}></Feed>:<p className='feedNull'>No articles are here... yet.</p>
            }  

        </div>
    )
}